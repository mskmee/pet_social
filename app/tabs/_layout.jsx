import React from 'react';
import {AppPages} from '../types/enums/app-pages';
import Home from './home';
import Post from './post';
import Network from './network';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppIcon} from '../components/app-icon';

const Tab = createBottomTabNavigator();
const HomeIcon = ({color}) => <AppIcon type="home" color={color} size={35} />;
const PostIcon = ({color}) => <AppIcon type="post" color={color} size={35} />;
const NetworkIcon = ({color}) => (
  <AppIcon type="network" color={color} size={35} />
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
        }}
      />
      <Tab.Screen
        name={AppPages.NETWORK}
        component={Network}
        options={{
          tabBarIcon: NetworkIcon,
        }}
      />
      <Tab.Screen
        name={AppPages.POST}
        component={Post}
        options={{
          tabBarIcon: PostIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeStack;
