import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import AddContent from '../screens/AddContent';
import ImageTab from '../tabcomponent/ImageTab';
import SearchTab from '../tabcomponent/SearchTab';
import VideoTab from '../tabcomponent/VideoTab';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
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
        name="ImageTab"
        component={ImageTab}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="VideoTab"
        component={VideoTab}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
