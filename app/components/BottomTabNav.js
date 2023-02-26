import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import AddContent from '../screens/AddContent';
import ImageBoard from '../screens/ImageBoard';
import VideoBoard from '../screens/VideoBoard';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// export const UserDetailScreen = () => {
//   return <UserDetail />;
// };

const BottomTabNav = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="AddContent " component={AddContent} />
      <Tab.Screen
        name="ImageBoard"
        component={ImageBoard}
        options={{headerShown: false}}
      />
      <Tab.Screen name="VideoBoard" component={VideoBoard} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
