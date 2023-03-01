import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {io} from 'socket.io-client';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native';

import GoBackButton from '../components/common/GoBackButton';
const DirectMessage = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const {token} = route.params;
  const {value} = route.params;
  const [socket, setSocket] = useState(null);
  const [totalMessage, setTotalMessage] = useState([]);
  //테스트용
  const handleSendMessage = () => {
    if (socket) {
      socket.emit('dm', {message: 'Hello, server!'});
      console.log('Sent message: Hello, server!');
    }
  };

  useEffect(() => {
    // Connect to the Socket.io server
    const newSocket = io(`ws://f1rstweb.shop:3001/dm/${value.roomId}`, {
      extraHeaders: {
        authorization: token,
      },
    });

    // Listen for connection success and set the socket state
    newSocket.on('connect', () => {
      console.log('Connected to server, dm');
      setSocket(newSocket);
    });
    newSocket.on('getMessages', data => {
      console.log(data, 'getMessages 데이터');
      setTotalMessage(data);
    });

    // Listen for incoming messages and update the message state
    newSocket.on('newDM', data => {
      console.log('Received message: ', data);
      // 방금 작성한 내용.
      setTotalMessage([data, ...totalMessage]);
      console.log(totalMessage, '최종추가된 메시지');
    });

    // Disconnect from the server when the component is unmounted
    return () => {
      // newSocket.disconnect();
      newSocket.disconnect();
      console.log(newSocket.disconnect());
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.userButton}>
        <GoBackButton />
      </View>
      <View style={styles.directMessageBox}>
        <View style={styles.targetProfileWrapper}>
          <FastImage
            style={styles.targetProfileImage}
            source={{
              uri: value.profileUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.targetFont}>{value.nickname}</Text>
        </View>
      </View>
      <View>
        <Text>FlatList</Text>
      </View>
      <View>
        <Text>인풋</Text>
      </View>
    </View>
  );
};

export default DirectMessage;

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
    zIndex: 4,
  },
  directMessageBox: {
    position: 'absolute',
    // top: '8%',
    width: '100%',
    height: '15.48%',
    backgroundColor: 'white',
    elevation: 3,
  },
  targetProfileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '14%',
    marginLeft: '7%',
    height: '100%',
  },
  targetProfileImage: {
    height: 32,
    width: 32,
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  targetFont: {
    fontSize: 20,
    marginLeft: '3%',
  },
});
