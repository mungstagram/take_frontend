import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import AuthInput from '../components/AuthInput';
import Button from '../components/common/Button';
import AuthNavigateButton from '../components/AuthNavigateButton';
import {__postUsers} from '../redux/modules/loginSlice';

const Signup = () => {
  const dispatch = useDispatch();

  //입력 초기값
  const initialState = {
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  };
  //멤버 스테이트 형성
  const [user, setUser] = useState(initialState);
  //멤버 스테이트 구조분해 할당
  const {email, nickname, password, passwordCheck} = user;
  //가입 조건 초기값
  const [emailInput, setEmailInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [passCheckInput, setPassCheckInput] = useState('');

  // 입력 조건 정규식 validation?
  const regEmail =
    /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
  const regNickname = /^[a-zA-Z0-9]{3,}$/;
  const regPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])?[A-Za-z\d$@$!%*#?&]{8,}$/;
  //유효성 검사 및 유즈스테이트 작성
  const onChangeUserHandler = (name, value) => {
    setUser({...user, [name]: value});
    if (name === 'email')
      !regEmail.test(value)
        ? setEmailInput(`이메일 형식이 아닙니다.`)
        : setEmailInput('');
    if (name === 'nickname')
      !regNickname.test(value)
        ? setNicknameInput(`영문과 숫자로 된 3글자 이상의 닉네임`)
        : setNicknameInput('');

    if (name === 'password')
      !regPassword.test(value)
        ? setPassInput(`@$!%*#?&와 영어 숫자로 된 8글자 이상의 비밀번호`)
        : setPassInput('');

    if (name === 'passwordCheck')
      password !== value
        ? setPassCheckInput('비밀번호가 불일치합니다')
        : setPassCheckInput('');
  };
  const onSubmitUserHandler = e => {
    e.preventDefault();
    if (
      email.trim() === '' ||
      password.trim() === '' ||
      passwordCheck.trim() === '' ||
      nickname.trim() === ''
    ) {
      return Alert.alert('모든 내용을 작성해주세요');
    }

    dispatch(
      __postUsers({
        email,
        password,
        nickname,
      }),
    );
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <Text>Login</Text>
      </View>

      <View>
        <AuthInput
          placeholder="id"
          helper={emailInput}
          onUpdateValue={onChangeUserHandler.bind(this, 'email')}
          value={email}
          // keyboardType="email-address"
        />
        <AuthInput
          placeholder="nickname"
          helper={nicknameInput}
          onUpdateValue={onChangeUserHandler.bind(this, 'nickname')}
          value={nickname}
        />
        <AuthInput
          placeholder="password"
          helper={passInput}
          onUpdateValue={onChangeUserHandler.bind(this, 'password')}
          value={password}
          secure
        />
        <AuthInput
          placeholder="password-check"
          helper={passCheckInput}
          onUpdateValue={onChangeUserHandler.bind(this, 'passwordCheck')}
          value={passwordCheck}
          secure
        />
      </View>
      <Button onPress={onSubmitUserHandler}>하잉!!</Button>
      <AuthNavigateButton />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  wrapper: {
    // alignItems: 'center',
    backgroundColor: 'black',
    // width: width,
    // flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    flex: 1,
  },
});
