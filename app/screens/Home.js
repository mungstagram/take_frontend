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
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({navigation}) {
  // const response = useSelector(state => state.login);
  // console.log('Home nick', myNick);
  // console.log('response', response);

  const dispatch = useDispatch();

  // let myNick = '';
  const [myNick, setMyNick] = useState();

  //data 불러옴
  const profile = useSelector(state => state.profile.profile);
  console.log('home profile', profile);

  useEffect(() => {
    const getNickName = async () => {
      setMyNick(await AsyncStorage.getItem('nickname'));
    };
    getNickName();
  }, [myNick]);
  console.log('myNick', myNick);

  useEffect(() => {
    console.log('home');
    dispatch(__getHomeProfile());
  }, []);

  return (
    <View style={styles.homeProfile}>
      <View style={styles.homeProfileInner}>
        <TouchableOpacity
          style={styles.goToProfileBtn}
          onPress={() => navigation.navigate('Profile', {myNick})}>
          <ServicesPinkImg />
        </TouchableOpacity>

        <View style={styles.profileImg}>
          {/* <FastImage
            style={styles.dogProfileImg}
            source={{
              uri: profile[1].dogs[1].contentUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          /> */}

          <FastImage
            style={styles.personProfileImg}
            source={{
              uri: profile[0].user.contentUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
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
              {/* {profile[1].dogs[1].name} */}
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
              {/* 우리가 함께한 날 {profile[1].dogs[1].daysWithin}일 */}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.homeTodoBox}>
        <View style={styles.homeTodoBoxInner}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              right: '26%',
              color: '#000000',
            }}>
            {/* {profile[1].dogs[1].species}/{profile[1].dogs[1].age}/
            {profile[1].dogs[1].weight}Kg */}
          </Text>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#c9c9c9',
              marginTop: '4%',
              width: '96%',
            }}
          />
          <View style={{width: 320}}>
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
    width: '100%',
    height: '100%',
    backgroundColor: '#ffc988',
    justifyContent: 'center',
    alignContent: 'center',
  },

  goToProfileBtn: {
    borderRadius: 100,
    backgroundColor: '#ffffff',
    width: 24,
    height: 24,
    top: '12%',
    left: '10%',
    margin: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeProfileInner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    right: '5%',
  },
  dogProfileImg: {
    width: 96,
    height: 96,
    borderRadius: 50,
    backgroundColor: '#291c1c',
    position: 'relative',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  personProfileImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
    top: 40,
    left: 90,
    zIndex: 2,
    backgroundColor: '#ffffff',
    position: 'absolute',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileInner: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  dogNameBox: {
    borderRadius: 20,
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
    borderRadius: 20,
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
    // borderWidth: 1,
    width: '100%',
    height: 548,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  homeTodoBoxInner: {
    // borderWidth: 1,
    alignItems: 'center',
    margin: '5%',
    height: '100%',
  },
});

export default Home;
