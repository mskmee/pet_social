import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {AppIcon} from '../components/app-icon';
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppPages} from '../types/enums/app-pages';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  const onSignInPressHandler = useCallback(
    () => navigation.navigate(AppPages.LOGIN),
    [navigation],
  );

  const registerPressHandler = useCallback(async () => {
    const user = {
      name,
      email,
      password,
      profileImage: image,
    };
    try {
      const response = await axios.post('http://10.0.2.2:8000/register', user);
      console.log(response);
      Alert.alert('Registration successful');
      setName('');
      setImage('');
      setPassword('');
      setEmail('');
    } catch (error) {
      Alert.alert(error.message);
    }
  }, [email, password, image, name]);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View>
        <Image
          style={{width: 150, height: 100, resizeMode: 'contain'}}
          source={{
            uri: 'https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png',
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041e42',
            }}>
            Register your account
          </Text>
        </View>
        <View style={{marginTop: 40}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#e0e0e0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}>
            <AppIcon
              style={{marginLeft: 8}}
              type="table-merge-cells"
              size={25}
            />
            <TextInput
              style={{
                color: 'gray',
                marginVertical: 5,
                width: 300,
                fontSize: 18,
              }}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#e0e0e0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <AppIcon style={{marginLeft: 8}} type="email" size={25} />
            <TextInput
              value={email}
              secureTextEntry
              style={{
                color: 'gray',
                marginVertical: 5,
                width: 300,
                fontSize: 18,
              }}
              onChangeText={setEmail}
              placeholder="Enter your email address"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#e0e0e0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <AppIcon style={{marginLeft: 8}} type="lock" size={25} />
            <TextInput
              value={password}
              secureTextEntry
              style={{
                color: 'gray',
                marginVertical: 5,
                width: 300,
                fontSize: 18,
              }}
              onChangeText={setPassword}
              placeholder="Enter your password"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#e0e0e0',
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <AppIcon style={{marginLeft: 8}} type="image" size={25} />
            <TextInput
              value={image}
              onChangeText={setImage}
              secureTextEntry
              style={{
                color: 'gray',
                marginVertical: 5,
                width: 300,
                fontSize: 18,
              }}
              placeholder="Enter your image url"
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 12,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text>Keep me login in</Text>
        </View>
        <View style={{marginTop: 80}}>
          <Pressable
            onPress={registerPressHandler}
            style={{
              width: 200,
              backgroundColor: '#0072b1',
              borderRadius: 6,
              alignSelf: 'center',
              padding: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Register
            </Text>
          </Pressable>
          <Pressable onPress={onSignInPressHandler} style={{marginTop: 15}}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
