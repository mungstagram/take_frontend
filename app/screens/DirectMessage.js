import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {io} from 'socket.io-client';

import GoBackButton from '../components/common/GoBackButton';
const DirectMessage = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const {token} = route.params;
  const {roomId} = route.params;
  const [socket, setSocket] = useState(null);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('dm', {message: 'Hello, server!'});
      console.log('Sent message: Hello, server!');
    }
  };

  useEffect(() => {
    // Connect to the Socket.io server
    const newSocket = io(`ws://f1rstweb.shop:3001/dm/${roomId}`, {
      extraHeaders: {
        authorization: token,
      },
    });

    // Listen for connection success and set the socket state
    newSocket.on('connect', () => {
      console.log('Connected to server, dm');
      // console.log(newSocket.connect().connected);
      setSocket(newSocket);

      // setSocket(newSocket);
    });
    newSocket.on('getMessages', data => {
      console.log(data, 'getMessages 데이터');
      // setSocket(newSocket);
    });

    // Listen for incoming messages and update the message state
    newSocket.on('newDM', data => {
      console.log('Received message: ', data);
    });

    // Disconnect from the server when the component is unmounted
    return () => {
      if (isFocused) {
        // newSocket.disconnect();
        newSocket.disconnect();
        console.log('요청종료,dm');
        console.log(newSocket.disconnect());
      }
    };
  }, [isFocused]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.userButton}>
        <GoBackButton />
      </View>
      <View style={styles.userSocketButton}>
        <Pressable onPress={handleSendMessage}>
          <Text>DM함</Text>
        </Pressable>
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
  },
  userSocketButton: {
    position: 'absolute',
    height: '7.48%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '27%',
  },
});
