import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppPages} from '../types/enums/app-pages';
import Home from './home';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={AppPages.HOME}>
      <Stack.Screen name={AppPages.HOME} component={Home} />
    </Stack.Navigator>
  );
}

export default HomeStack;
