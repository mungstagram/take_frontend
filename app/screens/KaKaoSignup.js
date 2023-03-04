import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../constants/colors';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/common/AuthButton';
import ArrowGoBack from '../components/svg/ArrowGoBack';

const KaKaoSignup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //   const nicknameInput = useRef('');
  const oncheckNickname = e => {
    if (nicknameInput.current !== '') {
    }
  };

  return (
    <ImageBackground
      source={require('../assets/kakaoNick.gif')}
      resizeMode={'cover'}
      style={{width: '100%', height: '100%'}}>
      <View style={styles.wrapper}>
        <View style={styles.buttonPosionter}>
          <View style={{alignItems: 'center'}}>
            <Pressable>
              <ArrowGoBack />
            </Pressable>
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.introduceText}>Pupfluencer에서 사용할 </Text>
          <Text style={styles.introduceText}>닉네임을 입력해주세요!</Text>
          <View style={{marginTop: 20}}>
            <AuthInput placeholder="Nick Name" />
          </View>
          <View style={{marginTop: 440}}>
            <AuthButton onPress={oncheckNickname}>입력 완료</AuthButton>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default KaKaoSignup;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonPosionter: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 16,
    marginLeft: 2,
  },
  inputWrapper: {
    width: '100%',
    marginTop: 40,
  },
  introduceText: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: 'bold',
    color: '#262626',
  },
});
