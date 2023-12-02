import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './authenticate/_layout';
import HomeStack from './tabs/_layout';
import {createStackNavigator} from '@react-navigation/stack';
import {AppPages} from './types/enums/app-pages';
import {storage} from './helpers/storage';

const Stack = createStackNavigator();

const Index = () => {
  const [initialRouteName, setInitialRouteName] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await storage.get('token');
      setInitialRouteName(isAuth ? AppPages.HOME_STACK : AppPages.AUTH_STACK);
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      {initialRouteName && (
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name={AppPages.AUTH_STACK} component={AuthStack} />
          <Stack.Screen name={AppPages.HOME_STACK} component={HomeStack} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Index;
