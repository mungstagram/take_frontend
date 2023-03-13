import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {Colors, BasicColors} from '../constants/colors';
import AddImage from '../components/addcontentcomp/AddImage';
import AddVideo from '../components/addcontentcomp/AddVideo';
import GoBackButton from '../components/common/GoBackButton';
import HeaderTitle from '../components/common/HeaderTitle';
import {resetNavigator} from '../redux/modules/addContentSlice';
import LoadingModal from '../components/common/LoadingModal';

const AddContent = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isWrittenNavigator} = useSelector(state => state.addContent);
  // 로딩중
  const {isAdding} = useSelector(state => state.addContent);
  //작성완료시 페이지 이동
  useEffect(() => {
    if (isWrittenNavigator === 'image') {
      navigation.navigate('Photo', {screen: 'ImageBoard'});
      dispatch(resetNavigator());
    } else if (isWrittenNavigator === 'video') {
      navigation.navigate('Video', {screen: 'VideoBoard'});
      dispatch(resetNavigator());
    }
  }, [isWrittenNavigator]);
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
          tabBarIndicatorStyle: {
            borderBottomWidth: 2,
            borderColor: Colors.mainColorDark,
          },
          tabBarLabelStyle: {fontSize: 12},
          tabBarItemStyle: {width: videoCardWidth * 0.34},
          tabBarHideOnKeyboard: 'true',
        }}>
        <Tab.Screen name="사진" component={AddImage} />
        <Tab.Screen name="동영상" component={AddVideo} />
      </Tab.Navigator>
      <LoadingModal modalHandler={isAdding} writting />
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
    color: Colors.mainColorDark,
    fontFamily: 'SBAggro-M',
    top: 3,
  },
  flex2: {
    flex: 1,
  },
});
