import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
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
        <Tab.Screen name="AddImage" component={AddImage} />
        <Tab.Screen name="AddVideo" component={AddVideo} />
      </Tab.Navigator>
    </>
  );
};

export default AddContent;

const styles = StyleSheet.create({
  container: {},
  goBackButton: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '7%',
  },
});
