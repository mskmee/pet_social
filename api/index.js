const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const {PORT, URL, EMAIL_PASSWORD, MONGO_PASSWORD, SAULT_ROUND} = process.env;

const app = express();
const cors = require('cors');
app.use(cors());

const fullUrl = `${URL}:${PORT}`;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const User = require('./models/user');
const Post = require('./models/post');

mongoose
  .connect(
    `mongodb+srv://admin:${MONGO_PASSWORD}@cluster0.okahdbs.mongodb.net/`,
  )
  .then(() => {
    console.log('connected to Mongodb');
  })
  .catch(err => {
    console.log(`Connect to mongodb failed: ${err}`);
  });

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mskmee2@gmail.com',
      pass: EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: 'app@gmail.com',
    to: email,
    subject: 'Verification',
    text: `Please click the following link verification: ${URL}:${PORT}/verify/${verificationToken}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.log('Error sending verification email', error);
  }
};

app.post('/register', async (req, res) => {
  try {
    const {name, email, password, profileImage} = req.body;
    if (!name || !email || !password) {
      throw new Error('Entry required fields');
    }
    const isEmailExist = await User.findOne({email: email});
    if (isEmailExist) {
      return res.status(400).json({message: 'Email already exists'});
    }
    const salt = bcrypt.genSaltSync(+SAULT_ROUND);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      profileImage,
    });
    newUser.verificationToken = crypto.randomBytes(20).toString('hex');
    await newUser.save();
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(200).json({
      message: 'Registration successful. Verification email sent successfully',
    });
  } catch (error) {
    console.log('Error registering', error);
    res.status(500).json({message: `Registration failed. ${error.message}`});
  }
});

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({message: 'Invalid username or password'});
    }
    const isIdentical = await bcrypt.compare(password, user.password);
    if (!isIdentical) {
      return res.status(401).json({message: 'Invalid username or password'});
    }
    const token = jwt.sign({userId: user._id}, secretKey);
    res.status(200).json({token});
  } catch (error) {
    console.log('Error registering', error);
    res.status(500).json({message: 'Login failed'});
  }
});

app.get('/verify/:verificationToken', async (req, res) => {
  try {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if (!user) {
      console.log('Error verifying didnt find user');
      return res.status(404).json({message: 'Verification token not found'});
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    return res.status(200).json({message: 'Verification successful'});
  } catch (error) {
    console.log('Error verifying', error);
    res.status(500).json({message: 'Verify token failed'});
  }
});

app.get('/profile/:userId', async (req, res) => {
  try {
    const {userId} = req.params || {};
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json(user);
  } catch (error) {
    console.log('Error getting profile', error);
    res.status(500).json({message: 'Error getting profile'});
  }
});

app.get('/users/:userId', async (req, res) => {
  try {
    const {userId} = req.params || {};
    const loggedInUser = await User.findById(userId).populate(
      'connections',
      '_id',
    );
    if (!loggedInUser) {
      return res.status(400).json({message: 'User not found'});
    }
    const connectedUsersId = loggedInUser.connections.map(
      connection => connection._id,
    );

    const users = await User.find({
      _id: {$ne: loggedInUser, $nin: connectedUsersId},
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log('Error getting user', error);
    res.status(500).json({message: 'Error getting users'});
  }
});

app.listen(PORT, () => console.log('Server running on port', fullUrl));
