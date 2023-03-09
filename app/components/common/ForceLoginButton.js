//리듀서 작업할 떄마다 튕기는거 귀찮아서 만듬 .. 배포시에는 삭제해야 함

import {StyleSheet, View, Pressable, Text} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import {checkLogin} from '../../redux/modules/loginSlice';
import MyText from './MyText';
const ForceLoginButton = () => {
  const dispatch = useDispatch();

  const forceLoginHandler = () => {
    dispatch(checkLogin());
  };

  return (
    <View style={styles.forcebutton}>
      <Pressable onPress={forceLoginHandler}>
        <View>
          <MyText>강제 로그인 (토큰 있을때만 쓰세요)</MyText>
        </View>
      </Pressable>
    </View>
  );
};

export default ForceLoginButton;

const styles = StyleSheet.create({
  forcebutton: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
  },
});
