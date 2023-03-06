import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import FastImage from 'react-native-fast-image';

import {__getHomeProfile} from '../redux/modules/profileSlice';

import TodoList from '../components/todos/TodoList';
import WriteTodo from '../components/todos/WriteTodo';
import ServicesPinkImg from '../components/svg/ServicesPinkImg';
import Pets from '../components/svg/Pets';
import Emoticon from '../components/svg/Emoticon';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({navigation}) {
  // const response = useSelector(state => state.login);
  // console.log('Home nick', myNick);
  // console.log('response', response);

  const dispatch = useDispatch();

  //이미지
  const [images, setImages] = useState([]);

  // let myNick = '';
  const [myNick, setMyNick] = useState();

  //data 불러옴
  const profile = useSelector(state => state.profile.profile);

  // console.log('home profile', profile);

  useEffect(() => {
    const getNickName = async () => {
      setMyNick(await AsyncStorage.getItem('nickname'));
    };
    getNickName();
  }, [myNick]);
  console.log('myNick', myNick);

  useEffect(() => {
    console.log('home에서 유즈이펙트');
    dispatch(__getHomeProfile());
  }, []);

  return (
    <View style={styles.homeProfile}>
      <View style={styles.goToLink}>
        <TouchableOpacity onPress={() => navigation.push('Profile', {myNick})}>
          <Text style={styles.homeFontStyle}>프로필</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('UserDetail', {myNick})}>
          <Text style={styles.homeFontStyle}>게시글</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('Profile')}>
          <Text style={styles.homeFontStyle}>메시지</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.homeProfileInner}>
        <View style={styles.profileImg}>
          {images.length !== 0 ? (
            <View style={styles.dogProfileImg}>
              <Pets />
            </View>
          ) : (
            <FastImage
              style={styles.dogProfileImg}
              source={{
                uri: profile[1]?.dogs[1]?.contentUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}

          {images.length !== 0 ? (
            <View style={styles.personProfileImg}>
              <Emoticon />
            </View>
          ) : (
            <FastImage
              style={styles.personProfileImg}
              source={{
                uri: profile[0]?.user.contentUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>

        <View style={styles.profileInner}>
          <View style={styles.dogNameBox}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: 'black',
                textAlign: 'center',
                top: '4%',
              }}>
              {profile[1]?.dogs[1]?.name}
            </Text>
          </View>
          <View style={styles.dDayBox}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#ffb284',
                textAlign: 'center',
                top: '4%',
              }}>
              우리가 함께한 날 {profile[1]?.dogs[1]?.daysWithin}일
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.homeTodoBox}>
        <View style={styles.homeTodoBoxInner}>
          <View style={styles.toDoText}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000000',
                marginTop: '4%',
              }}>
              {profile[1]?.dogs[1]?.species}/{profile[1]?.dogs[1]?.age}/
              {profile[1]?.dogs[1]?.weight}Kg
            </Text>
          </View>

          <View style={styles.listBox}>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#c9c9c9',
                marginTop: '4%',
                width: 320,
              }}
            />
            <WriteTodo />
            <TodoList />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeProfile: {
    borderWidth: 1,
    backgroundColor: '#ffc988',
    justifyContent: 'center',
    alignContent: 'center',
  },
  goToLink: {
    // borderWidth: 1,
    flexDirection: 'row',
    left: '32%',
    marginBottom: 26,
    marginTop: 56,
  },
  homeProfileInner: {
    width: '100%',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeFontStyle: {
    fontSize: 11,
    width: 40,
    height: 24,
    color: '#ffffff',
  },
  profileImg: {
    width: 120,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dogProfileImg: {
    width: 96,
    height: 96,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    opacity: 0.7,
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  personProfileImg: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    opacity: 0.7,
    zIndex: 1,
    top: '20%',
    right: '24%',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInner: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  dogNameBox: {
    borderRadius: 14,
    width: 128,
    height: 28,
    paddingTop: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 5,
  },
  dDayBox: {
    borderRadius: 14,
    width: 208,
    height: 28,
    paddingTop: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    margin: 4,
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 5,
  },
  homeTodoBox: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    marginTop: '4%',
  },
  homeTodoBoxInner: {
    // borderWidth: 1,
    borderColor: 'red',
    width: 320,
    marginBottom: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toDoText: {
    // borderWidth: 1,
    right: '26%',
    color: '#000000',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '8%',
  },
  listBox: {
    // borderWidth: 1,
    width: 321,
    height: 408,
  },
});

export default Home;
