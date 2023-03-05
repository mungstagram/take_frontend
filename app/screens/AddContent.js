import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AddImage from '../components/addcontentcomp/AddImage';
import AddVideo from '../components/addcontentcomp/AddVideo';
import GoBackButton from '../components/common/GoBackButton';

const AddContent = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.goBackButton}>
          <GoBackButton />
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="AddImage"
          component={AddImage}
          style={styles.tabStyle}
        />
        <Tab.Screen
          name="AddVideo"
          component={AddVideo}
          style={styles.tabStyle}
        />
      </Tab.Navigator>
    </>
  );
};

export default AddContent;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.9;

const styles = StyleSheet.create({
  container: {},
  goBackButton: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '7%',
  },
  tabStyle: {},
});
