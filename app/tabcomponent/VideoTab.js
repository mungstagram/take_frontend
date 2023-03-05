import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VideoBoard from '../screens/VideoBoard';
import VideoDetail from '../screens/VideoDetail';
import ModifyVideo from '../components/modifycontentcomp/ModifyVideo';

const Stack = createNativeStackNavigator();

const VideoTab = () => {
  return (
    <Stack.Navigator initialRouteName="VideoBoard">
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
      <Stack.Screen
        name="ModifyVideo"
        component={ModifyVideo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default VideoTab;
