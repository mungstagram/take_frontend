import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import UserBoardWrap from '../components/userdetail/UserBoardWrap';

// import {Colors} from '../constants/colors';

const UserDetail = () => {
  return (
    <View style={styles.Wrapper}>
      <View style={styles.Container1}>
        <Text> 로그인 성공~</Text>
      </View>
      <View style={styles.Container2}>
        <UserBoardWrap />
      </View>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
  },
  Container1: {
    flex: 1,
    backgroundColor: 'blue',
  },
  Container2: {
    flex: 3,
  },
  UserBoardWrap,
});
