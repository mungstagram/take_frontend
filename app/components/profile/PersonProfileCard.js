import React, {useEffect} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

import {__getProfile} from '../../redux/modules/profileSlice';

import Logout from '../Logout';
import AddProfileImg from './AddProfileImg';

const PersonProfileCard = () => {
  // const PersonProfileCard = ({myInfo}) => {
  //   console.log('user myNick', myInfo[0].user);
  const dispatch = useDispatch();

  useEffect(() => {
    //2.데이터 값을 초기에 실행(마운트될때, 안에 있는 함수을 실행)
    dispatch(__getProfile());
    //3. dispatch get 프로필 정보 요청
    // console.log('2.2.user', nickname);
    // console.log('person profile');
  }, []);

  const profile = useSelector(state => state.profile.profile);
  // console.log('state.profile', profile[0]);
  // console.log('user dog', myInfo[1].dogs);
  // console.log('contentUrl', myInfo[0].user.contentUrl);

  return (
    <View style={styles.block}>
      <View style={styles.authBtn}>
        <Logout />
      </View>
      <View style={styles.card}>
        <View style={styles.cardLeftWrap}>
          <View style={styles.textInputIntroWrap}>
            <View style={styles.textInputWrap}>
              <Text style={{fontSize: 16, fontWeight: '600'}}>
                {profile[0].user.nickname}
              </Text>
            </View>

            <Text>{profile[0].user.introduce}</Text>
          </View>
        </View>

        <View style={styles.cardRightWrap}>
          <View style={styles.imgOpenBtn}>
            <Text
              style={{
                width: 60,
                fontSize: 8,
                zIndex: 3,
                color: 'black',
                left: '10%',
              }}>
              사용자 프로필{'\n'}업데이트 하기
            </Text>
            <FastImage
              style={styles.personImg}
              source={{
                uri: profile[0].user.contentUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          <Text
            style={{
              fontSize: 12,
              top: '20%',
              left: '5%',
              marginTop: '5%',
              color: 'black',
              position: 'relative',
            }}>
            {profile[0].user.dogsCount} 마리의 집사
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 10,
    width: 320,
    height: 168,
    margin: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardLeftWrap: {
    // borderWidth: 1,
    width: 210,
    top: 10,
  },
  textInputWrap: {
    // borderWidth: 1,
    // borderColor: 'red',
    borderColor: 'gray',
    borderRadius: 5,
    flexDirection: 'row',
    width: 176,
    height: 56,
  },
  textInputIntroWrap: {
    flexDirection: 'column',
    // borderWidth: 1,
    width: 176,
    left: '15%',
    top: '5%',
  },
  textInputBtn: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    left: '55%',
    top: '12%',
    position: 'absolute',
  },
  checkBtn: {
    // borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#e79796',
    width: 64,
    height: 36,
    color: '#ffffff',
    textAlign: 'center',
    padding: 5,
    zIndex: 1,
    left: '5%',
    top: '2%',
    position: 'relative',
  },
  textInputIntro: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: 176,
    height: 72,
    marginTop: '3%',
    borderColor: 'gray',
    // borderColor: 'red',
  },
  cardRightWrap: {
    // borderWidth: 1,
    width: 140,
  },

  authBtn: {
    // borderWidth: 1,
    width: 140,
    height: 40,
    top: '8%',
    left: '40%',
    zIndex: 5,
  },

  personImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    top: '10%',
    left: '15%',
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  imgOpenBtn: {
    // borderWidth: 1,
    borderColor: 'red',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    right: '10%',
    top: '15%',
  },
});

export default PersonProfileCard;
