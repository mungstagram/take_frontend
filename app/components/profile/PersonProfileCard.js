import React from 'react';
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

import Logout from '../Logout';

const PersonProfileCard = () => {
  return (
    <View style={styles.block}>
      <View style={styles.card}>
        <View style={styles.cardLeftWrap}>
          <View style={styles.textInputWrap}>
            <TextInput style={{left: 10}} placeholder="Nick Name" />
            <TouchableOpacity style={styles.textInput}>
              <Text style={styles.checkBtn}>중복확인</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textInputIntroWrap}>
            <TextInput
              style={styles.textInputIntro}
              maxLength={25}
              multiline={true}
              placeholder="성격, 산책 시간, 거주지 소개"
            />
            <Text
              style={{position: 'absolute', zIndex: 1, left: 150, bottom: 10}}>
              0/25
            </Text>
          </View>
        </View>

        <View style={styles.cardRightWrap}>
          <TouchableOpacity style={styles.personProfileImg} />
          <Text
            style={{
              fontSize: 12,
              zIndex: 3,
              position: 'absolute',
              top: '25%',
              color: 'black',
            }}>
            사용자 프로필{'\n'}업데이트 하기
          </Text>

          <Text
            style={{
              fontSize: 12,
              bottom: '25%',
              color: 'black',
              position: 'absolute',
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
    width: '90%',
    height: 200,
    margin: 10,
    padding: 10,
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
    borderWidth: 1,
    borderRadius: 5,
    width: 190,
    flexDirection: 'row',
    margin: 5,
    borderColor: 'gray',
  },
  textInputIntroWrap: {
    flexDirection: 'row',
  },
  textInput: {
    // borderWidth: 1,
    padding: 10,
    width: 100,
  },
  checkBtn: {
    // borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#e79796',
    width: 70,
    height: 30,
    color: '#ffffff',
    textAlign: 'center',
    padding: 5,
    zIndex: 1,
    left: 20,
  },
  textInputIntro: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 190,
    height: 90,
    margin: 5,
    borderColor: 'gray',
  },
  cardRightWrap: {
    // borderWidth: 1,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personProfileImg: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50,
    top: 2,
    zIndex: 1,
    backgroundColor: '#eeeeee',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authBtn: {
    // borderWidth: 1,
    width: 140,
    height: 40,
    top: '35%',
    zIndex: 5,
  },
});
export default PersonProfileCard;
