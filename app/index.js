import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './authenticate/_layout';
import HomeStack from './tabs/_layout';
import {createStackNavigator} from '@react-navigation/stack';
import {AppPages} from './types/enums/app-pages';

const Stack = createStackNavigator();

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={AppPages.AUTH_STACK}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={AppPages.AUTH_STACK} component={AuthStack} />
        <Stack.Screen name={AppPages.HOME_STACK} component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
