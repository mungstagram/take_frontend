import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SearchScreen from '../screens/SearchScreen';
import UserDetail from '../screens/UserDetail';
import DirectMessage from '../screens/DirectMessage';
import MessageBox from '../screens/MessageBox';
import ImageDetail from '../screens/ImageDetail';
import VideoDetail from '../screens/VideoDetail';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const SearchTab = () => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MessageBox"
        component={MessageBox}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DirectMessage"
        component={DirectMessage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ImageDetail"
        component={ImageDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SearchTab;
