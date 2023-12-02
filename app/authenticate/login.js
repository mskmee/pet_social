import {
  StyleSheet,
  Image,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppIcon} from '../components/app-icon';
import {useNavigation} from '@react-navigation/native';
import {AppPages} from '../types/enums/app-pages';
import axios from 'axios';
import {storage} from '../helpers/storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onSignUpPressHandler = useCallback(
    () => navigation.navigate(AppPages.REGISTER),
    [navigation],
  );

  const onLoginPressHandler = useCallback(async () => {
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post('http://10.0.2.2:8000/login', user);
      Alert.alert('Login successful');
      setPassword('');
      setEmail('');
      storage.set('token', response.data.token);
      navigation.navigate(AppPages.HOME_STACK);
    } catch (error) {
      Alert.alert(error.message);
    }
  }, [email, password, navigation]);

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
            Login to your account
          </Text>
        </View>
        <View style={{marginTop: 70}}>
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
            <AppIcon style={{marginLeft: 8}} type="email" size={25} />
            <TextInput
              style={{
                color: 'gray',
                marginVertical: 5,
                width: 300,
                fontSize: 18,
              }}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
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
        </View>
        <View
          style={{
            marginTop: 12,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text>Keep me login in</Text>
          <Text style={{color: '#007FFF', fontWeight: 500}}>
            Forgot password
          </Text>
        </View>
        <View style={{marginTop: 80}}>
          <Pressable
            onPress={onLoginPressHandler}
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
              Login
            </Text>
          </Pressable>
          <Pressable style={{marginTop: 15}} onPress={onSignUpPressHandler}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
