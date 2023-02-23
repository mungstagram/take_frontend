import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import UserBoardWrap from '../components/userdetail/UserBoardWrap';
import UserDetailProf from '../components/userdetail/UserDetailProf';
// import {Colors} from '../constants/colors';

const UserDetail = () => {
  return (
    <View style={styles.Wrapper}>
      <View style={styles.Container1}>
        <View>
          <UserDetailProf />
        </View>
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
    flex: 272,
  },
  Container2: {
    flex: 528,
  },
  UserBoardWrap,
});
