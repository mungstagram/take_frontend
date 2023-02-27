import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

import UserBoardWrap from '../components/userdetail/UserBoardWrap';
import UserDetailProf from '../components/userdetail/UserDetailProf';
// import {Colors} from '../constants/colors';
const UserDetail = () => {
  const route = useRoute();
  const {nickname} = route.params;
  return (
    <View style={styles.wrapper}>
      <View style={styles.container1}>
        <View>
          <UserDetailProf nickname={nickname} />
        </View>
      </View>
      <View style={styles.container2}>
        <UserBoardWrap nickname={nickname} />
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
