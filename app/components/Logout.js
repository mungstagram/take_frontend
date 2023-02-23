import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {checkLogout} from '../redux/modules/loginSlice';

const Logout = () => {
  const dispatch = useDispatch();

  const onLogoutHandelr = () => {
    AsyncStorage.removeItem('authorization');
    dispatch(checkLogout());
  };

  return (
    <View>
      <Pressable onPress={onLogoutHandelr}>
        <Text style={styles.textStyle}>로그아웃(꾸며주세요)</Text>
      </Pressable>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    backgroundColor: 'yellow',
  },
});
