import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/core';
import {io} from 'socket.io-client';

import {API_URL} from '@env';

import GoBackButton from '../components/common/GoBackButton';
const MessageBox = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // useEffect로 받은 본인의 nickname
  const {myNick} = route.params;
  //   console.log(myNick, '메시지박스'); //Seeder1 메시지박스

  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the Socket.io server
    const newSocket = io('http://3.35.173.73'); // Replace with your server URL

    // Listen for connection success and set the socket state
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setSocket(newSocket);
    });

    // Listen for incoming messages and update the message state
    newSocket.on('message', data => {
      console.log('Received message: ', data);
      setMessage(data);
    });

    // Disconnect from the server when the component is unmounted
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('message', 'Hello, server!');
      console.log('Sent message: Hello, server!');
    }
  };

  //   const socket = io('http://3.35.173.73');

  return (
    <View style={styles.wrapper}>
      <View style={styles.userButton}>
        <GoBackButton />
      </View>
      <View style={styles.userSocketButton}>
        <Pressable onPress={handleSendMessage}>
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
