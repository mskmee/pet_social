import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {storage} from '../helpers/storage';
import {Buffer} from 'buffer';
import axios from 'axios';

const Network = () => {
  const [userId, setUserId] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await storage.get('token');
        const parts = token.split('.').map(part => {
          return Buffer.from(
            part.replace(/-/g, '+').replace(/_/g, '/'),
            'base64',
          );
        });
        const {userId: tokenUserId} = JSON.parse(parts[1]);

        setUserId(tokenUserId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/profile/${userId}`,
      );
      setUserProfile(response.data.user);
    } catch (error) {
      console.log('Error with get profile', error);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUserProfile();
  }, [userId, fetchUserProfile]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const fetchUsersProfile = async () => {
      const response = await axios.get(`http://10.0.2.2:8000/users/${userId}`);
      setUsersData(response.data);
      console.log(response.data, 'users');
    };
    fetchUsersProfile();
    try {
    } catch (error) {}
  }, [userId]);

  return (
    <View>
      <Text>Network</Text>
    </View>
  );
};

export default Network;
