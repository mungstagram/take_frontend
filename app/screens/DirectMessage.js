import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {io} from 'socket.io-client';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native';

import GoBackButton from '../components/common/GoBackButton';
import SendDM from '../components/svg/SendDM';
const DirectMessage = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const {token} = route.params;
  const {value} = route.params;
  const [socket, setSocket] = useState(null);
  const [totalMessage, setTotalMessage] = useState([]); // 상대방과 대화한 총 대화내역
  //인풋창에 쓰는 내가 작성한 메시지
  const [myDM, setMyDM] = useState('');
  //테스트용

  const onChangeInputHandler = e => {
    setMyDM(e);
  };

  const handleSendMessage = () => {
    if (socket && myDM !== '') {
      socket.emit('dm', {message: myDM});
      console.log('Sent message: ', myDM);
      setMyDM('');
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
      // console.log(data, 'getMessages 데이터');
      setTotalMessage([...data]);
      console.log(totalMessage, 'get에서 저장되었는가?');
    });

    // Listen for incoming messages and update the message state
    newSocket.on('newDM', data => {
      console.log('Received message: ', data);
      // 방금 작성한 내용.
      console.log(totalMessage, '저장된 메시지들');
      // console.log(data, '나는 데이터');
      console.log([data, ...totalMessage], '제대로 되는가?');
      setTotalMessage([data, ...totalMessage]);
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
      <View style={styles.chatListWrapper}>
        <FlatList
          data={totalMessage}
          renderItem={({item, index}) => (
            <View>
              <Text>{index}</Text>
              <Text>{item.message}</Text>
              <Text>{item.createAt}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
          horizontal={false}
        />
      </View>
      <KeyboardAvoidingView
        style={styles.bottomInputWrapper}
        behavior="padding"
        // contentContainerStyle={styles.bottomInputWrapper}
        keyboardVerticalOffset={50}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInputStyler}
            placeholder="메시지 입력하기"
            value={myDM}
            onChangeText={onChangeInputHandler}
          />
          <Pressable style={styles.sendMsgArea} onPress={handleSendMessage}>
            <View style={styles.sendIconPositioner}>
              <SendDM />
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
  bottomInputWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '12%',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  // bottomAvoidInputWrapper: {
  //   position: 'absolute',
  //   bottom: '12%',
  //   width: '100%',
  //   height: '12%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  sendIconPositioner: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendMsgArea: {
    position: 'absolute',
    right: '0%',
    zIndex: 3,
    width: '25%',
    alignItems: 'flex-end',
    height: '100%',
    justifyContent: 'center',
    paddingRight: '23%',
  },
  textInputContainer: {
    // alignItems: 'center',
    flexDirection: 'row',
    width: '91%',
    borderRadius: 4,
    height: 56,
    backgroundColor: 'white',
  },
  textInputStyler: {
    fontSize: 14,
    padding: 0,
    paddingLeft: '5.5%',
    height: '100%',
    width: '70%',
  },
  chatListWrapper: {
    position: 'absolute',
    top: '19%',
    height: '70%',
    backgroundColor: 'red',
    width: '100%',
  },
});
