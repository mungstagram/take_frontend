import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Home from '../screens/Home';
import AddContent from '../screens/AddContent';
import ImageBoard from '../screens/ImageBoard';
import VideoBoard from '../screens/VideoBoard';
import UserDetail from '../screens/UserDetail';

const BottomTabNav = () => {
  return (
    <Tab.Navigator initialRouteName="UserDetail">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="UserDetail" component={UserDetail} />
      <Tab.Screen name="AddContent " component={AddContent} />
      <Tab.Screen name="ImageBoard" component={ImageBoard} />
      <Tab.Screen name="VideoBoard" component={VideoBoard} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
