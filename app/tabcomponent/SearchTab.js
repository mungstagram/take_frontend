import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SearchScreen from '../screens/SearchScreen';
import UserDetail from '../screens/UserDetail';
import DirectMessage from '../screens/DirectMessage';
import MessageBox from '../screens/MessageBox';

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
    </Stack.Navigator>
  );
};

export default SearchTab;
