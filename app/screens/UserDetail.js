import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import UserBoardWrap from '../components/userdetail/UserBoardWrap';
import UserDetailProf from '../components/userdetail/UserDetailProf';
// import {Colors} from '../constants/colors';
import BottomTabNav from '../components/BottomTabNav';
const UserDetail = ({route, navigation}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container1}>
        <View>
          <UserDetailProf />
        </View>
      </View>
      <View style={styles.container2}>
        <UserBoardWrap />
      </View>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container1: {
    flex: 272,
  },
  container2: {
    flex: 528,
  },
  UserBoardWrap,
});
