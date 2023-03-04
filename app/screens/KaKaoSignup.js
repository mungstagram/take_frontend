import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/common/AuthButton';
import ArrowGoBack from '../components/svg/ArrowGoBack';
import {__kakaoNick, checkLogout} from '../redux/modules/loginSlice';

const KaKaoSignup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const regNickname = /^[a-zA-Z0-9]{3,10}$/;

  //닉네임 유효성 검사
  const onChangeNicknameHandler = value => {
    setNickname(value);

    !regNickname.test(value)
      ? setNicknameInput('영문 또는 숫자 3~10자를 입력해야합니다.')
      : setNicknameInput('');
  };

  // 닉네임 중복여부 검사 및 등록
  const oncheckNickname = e => {
    if (
      nickname === '' ||
      nicknameInput === '영문 또는 숫자 3~10자를 입력해야합니다.'
    ) {
      return;
    }
    dispatch(__kakaoNick({nickname: nickname}));
  };

  //뒤로가기 버튼,, 카카오토큰 제거함으로서 이동
  const deleteKakaoToken = () => {
    AsyncStorage.removeItem('authorization');
    dispatch(checkLogout());
  };

  return (
    <ImageBackground
      source={require('../assets/kakaoNick.gif')}
      resizeMode={'cover'}
      style={{width: '100%', height: '100%'}}>
      <View style={styles.wrapper}>
        <View style={styles.buttonPosionter}>
          <View style={{alignItems: 'center'}}>
            <Pressable onPress={deleteKakaoToken}>
              <ArrowGoBack />
            </Pressable>
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.introduceText}>Pupfluencer에서 사용할 </Text>
          <Text style={styles.introduceText}>닉네임을 입력해주세요!</Text>
          <View style={{marginTop: 20}}>
            <AuthInput
              placeholder="Nick Name"
              helper={nicknameInput}
              onUpdateValue={onChangeNicknameHandler}
              value={nickname}
              isInvalid={regNickname.test(nickname)}
            />
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
