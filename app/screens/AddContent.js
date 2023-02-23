import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AddImage from '../components/addcontentcomp/AddImage';
import AddVideo from '../components/addcontentcomp/AddVideo';
const AddContent = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <View style={styles.container}>
        <Text>로고</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="AddImage" component={AddImage} />
        <Tab.Screen name="AddVideo" component={AddVideo} />
      </Tab.Navigator>
    </>
  );
};

export default AddContent;

const styles = StyleSheet.create({
  container: {},
});
