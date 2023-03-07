import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {Colors, BasicColors} from '../constants/colors';
import AddImage from '../components/addcontentcomp/AddImage';
import AddVideo from '../components/addcontentcomp/AddVideo';
import GoBackButton from '../components/common/GoBackButton';
import HeaderTitle from '../components/common/HeaderTitle';

const AddContent = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerBox}>
          <View style={styles.goBackButton}>
            <GoBackButton />
          </View>
          <View style={styles.headerTitle}>
            <HeaderTitle />
            <Text style={styles.title}>내새끼 자랑하기</Text>
          </View>
          <View style={styles.flex2}></View>
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="사진" component={AddImage} style={styles.tabStyle} />
        <Tab.Screen
          name="동영상"
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
  container: {
    backgroundColor: BasicColors.whiteColor,
  },
  headerBox: {
    width: videoCardWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBackButton: {
    height: 58,
    alignItems: 'flex-start',
    marginLeft: '7%',
    paddingTop: 18,
    zIndex: 20,
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    width: videoCardWidth * 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 5,
  },
  title: {
    marginHorizontal: videoCardWidth * 0.05,
    fontSize: 28,
    color: Colors.userDataColor,
    fontFamily: 'SBAggro-M',
  },
  flex2: {
    flex: 1,
  },
  tabStyle: {},
});
