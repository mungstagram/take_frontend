import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors, BasicColors} from '../constants/colors';

import AddImage from '../components/addcontentcomp/AddImage';
import AddVideo from '../components/addcontentcomp/AddVideo';
import GoBackButton from '../components/common/GoBackButton';

const AddContent = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.goBackButton}>
            <GoBackButton />
          </View>
          <View style={styles.headerLogo}>
            <Image
              source={require('../assets/LogoSmall.png')}
              resizeMode={'cover'}
            />
            <Text style={styles.headText}>내새끼 자랑하기</Text>
          </View>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: '#000000',
          tabBarActiveTintColor: Colors.userDataColor,
          tabBarStyle: {borderBttomColor: Colors.userDataColor},
        }}>
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
    backgroundColor: '#fffff',
  },
  goBackButton: {
    height: 58,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '4%',
  },
  tabStyle: {
    borderColor: Colors.userDataColor,
  },
  header: {
    marginTop: '4%',
    marginBottom: '4%',
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: '7%',
    alignItems: 'center',
    width: '100%',
  },
  headerLogo: {
    marginLeft: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.userDataColor,
    lineHeight: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
