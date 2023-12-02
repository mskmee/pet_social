import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppPages} from '../types/enums/app-pages';
import Register from './register';
import Login from './login';
import {storage} from '../helpers/storage';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

function AuthStack() {
  const navigation = useNavigation();
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await storage.get('token');
      console.log(isAuth);
      if (isAuth) {
        navigation.navigate(AppPages.HOME_STACK);
      }
    };
    checkAuth();
  }, [navigation]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={AppPages.LOGIN}>
      <Stack.Screen name={AppPages.REGISTER} component={Register} />
      <Stack.Screen name={AppPages.LOGIN} component={Login} />
    </Stack.Navigator>
  );
}

export default AuthStack;
