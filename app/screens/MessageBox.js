import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/core';
import {io} from 'socket.io-client';
import {useIsFocused} from '@react-navigation/core';
import {API_URL} from '@env';

import GoBackButton from '../components/common/GoBackButton';
const MessageBox = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  // useEffect로 받은 본인의 nickname
  const {token} = route.params;
  console.log(token);
  //   console.log(myNick, '메시지박스'); //Seeder1 메시지박스

  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  //임시
  const [roomNum, setRoomNum] = useState('');
  useEffect(() => {
    // Connect to the Socket.io server
    const newSocket = io('ws://f1rstweb.shop:3001/DMList', {
      extraHeaders: {
        authorization: token,
      },
    });

    // Listen for connection success and set the socket state
    newSocket.on('connect', () => {
      console.log('Connected to server');
      // console.log(newSocket.connect().connected);

      setSocket(newSocket);
    });
    newSocket.on('DMList', data => {
      console.log(data, 'DMlist 데이터');
      setRoomNum(data[0].roomId);
      // setSocket(newSocket);
    });

    // Listen for incoming messages and update the message state
    // newSocket.on('newDM', data => {
    //   console.log('Received message: ', data);
    //   setMessage(data);
    // });

    // Disconnect from the server when the component is unmounted
    return () => {
      if (isFocused) {
        // newSocket.disconnect();
        newSocket.disconnect();
        // newSocket.io.close();
        console.log('요청종료, 리스트');
        console.log(newSocket.disconnect());
      }
    };
  }, [isFocused]);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('message', 'Hello, server!');
      console.log('Sent message: Hello, server!');
    }
  };
  const accessRoomHandler = () => {
    console.log(roomNum, '함수 되는지');
    navigation.push('DirectMessage', {roomId: roomNum, token});
  };

  //   const socket = io('http://3.35.173.73');

  return (
    <View style={styles.wrapper}>
      <View style={styles.userButton}>
        <GoBackButton />
      </View>
      <View style={styles.userSocketButton}>
        <Pressable onPress={accessRoomHandler}>
          <Text>메시지함</Text>
        </Pressable>
      </View>
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
  userSocketButton: {
    position: 'absolute',
    height: '7.48%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '27%',
  },
});
