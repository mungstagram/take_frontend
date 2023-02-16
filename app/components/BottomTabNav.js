import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Home from '../screens/Home';
import AddContent from '../screens/AddContent';
import ImageBoard from '../screens/ImageBoard';
import VideoBoard from '../screens/VideoBoard';

const BottomTabNav = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Search" component={Home} /> */}
      <Tab.Screen name="AddContent " component={AddContent} />
      <Tab.Screen name="ImageBoard" component={ImageBoard} />
      <Tab.Screen name="VideoBoard" component={VideoBoard} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
