import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SearchScreen from '../screens/SearchScreen';
import UserDetail from '../screens/UserDetail';

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
        name="AddContent "
        component={AddContent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoBoard"
        component={VideoBoard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoDetail"
        component={VideoDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SearchTab;
