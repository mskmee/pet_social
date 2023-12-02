import React from 'react';
import {AppPages} from '../types/enums/app-pages';
import Home from './home';
import Profile from './profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppIcon} from '../components/app-icon';

const Tab = createBottomTabNavigator();
const HomeIcon = ({color}) => <AppIcon type="home" color={color} size={35} />;
const ProfileIcon = ({color}) => (
  <AppIcon type="account" color={color} size={35} />
);

function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#e3e3e3',
        tabBarStyle: {
          height: 60,
        },
        tabBarLabel: () => null,
      }}
      initialRouteName={AppPages.HOME}>
      <Tab.Screen
        name={AppPages.HOME}
        component={Home}
        options={{
          tabBarIcon: HomeIcon,
          tabBarLabelStyle: {color: 'red'},
        }}
      />
      <Tab.Screen
        name={AppPages.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeStack;
