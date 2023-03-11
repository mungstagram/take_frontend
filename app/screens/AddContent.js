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
import MyText from '../components/common/MyText';

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
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {borderBottomWidth: 2, borderColor: '#C6C09C'},
          tabBarLabelStyle: {fontSize: 12},
          tabBarItemStyle: {width: videoCardWidth * 0.34},
          activeTintColor: 'rgba(16,37,68,1)',
          inactiveTintColor: 'rgba(16,37,68,1)',
        }}>
        <Tab.Screen name="사진" component={AddImage} />
        <Tab.Screen name="동영상" component={AddVideo} />
      </Tab.Navigator>
    </>
  );
};

export default AddContent;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.92;

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
    top: 3,
  },
  flex2: {
    flex: 1,
  },
});
