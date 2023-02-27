import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import useRoute from '@react-navigation/core';
import io from 'socket.io-client';

import GoBackButton from '../components/common/GoBackButton';
const MessageBox = ({myNickName}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {nickname} = route.params;

  return (
    <View style={styles.wrapper}>
      <View style={styles.userButton}>
        <GoBackButton />
      </View>
      <Text>메시지함</Text>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
  },
  userButton: {
    position: 'absolute',
    height: '7.48%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '7%',
  },
});
