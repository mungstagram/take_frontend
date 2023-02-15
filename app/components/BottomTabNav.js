import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Home from '../screens/Home';

const BottomTabNav = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Home} />
      <Tab.Screen name="AddContent " component={Home} />
      <Tab.Screen name="Image" component={Home} />
      <Tab.Screen name="Video" component={Home} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
