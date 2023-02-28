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
import {__getProfile} from '../../redux/modules/personProfileSlice';

import Logout from '../Logout';
import AddProfileImg from './AddProfileImg';

const PersonProfileCard = ({nickname}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //2.데이터 값을 초기에 실행(마운트될때, 안에 있는 함수을 실행)
    dispatch(__getProfile({nickname}));
    //3. dispatch get 프로필 정보 요청
    console.log('2.2.user', nickname);
  }, []);

  const profile = useSelector(state => state.profile);

  return (
    <View style={styles.block}>
      <View style={styles.card}>
        <View style={styles.cardLeftWrap}>
          <View style={styles.textInputIntroWrap}>
            <View style={styles.textInputWrap}>
              <Text style={{fontSize: 16, fontWeight: '600'}}> {profile}</Text>
            </View>

            <Text>성격,산책 시간,</Text>
            <Text>거주지 등의 소개(0/25)</Text>
          </View>
        </View>

        <View style={styles.cardRightWrap}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              width: 24,
              height: 24,
              left: '60%',
              top: '5%',
              zIndex: 2,
            }}>
            <Text>수정</Text>
          </TouchableOpacity>
          <View style={styles.imgOpenBtn}>
            <AddProfileImg />
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
          </View>

          <Text
            style={{
              fontSize: 12,
              top: '5%',
              left: '5%',
              color: 'black',
              position: 'relative',
            }}>
            00 마리의 집사
          </Text>

          <View style={styles.authBtn}>
            <Logout />
          </View>
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
    zIndex: 5,
  },

  personProfileImg: {
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
    left: '4%',
  },
});

export default PersonProfileCard;
