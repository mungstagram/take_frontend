import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
    backgroundColor: 'red',
  },
  Container1: {
    flex: 1,
    backgroundColor: 'blue',
  },
  Container2: {
    flex: 3,
    backgroundColor: 'red',
  },
});
