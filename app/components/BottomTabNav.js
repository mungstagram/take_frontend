import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import AddContent from '../screens/AddContent';
import ImageBoard from '../screens/ImageBoard';
import VideoBoard from '../screens/VideoBoard';
import SearchTab from '../tabcomponent/SearchTab';
import VideoDetail from '../screens/VideoDetail';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="SearchTab"
        component={SearchTab}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="AddContent "
        component={AddContent}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ImageBoard"
        component={ImageBoard}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="VideoBoard"
        component={VideoBoard}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
