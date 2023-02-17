import React, {useRef, useState} from 'react';
import {Alert, View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import AuthInput from '../components/AuthInput';
import Button from '../components/Button';
import AuthNavigateButton from '../components/AuthNavigateButton';
import {__postLogin} from '../redux/modules/loginSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const dispatch = useDispatch();
  const idInput = useRef('');
  const passwordInput = useRef();

  const onSubmitLogin = e => {
    console.log('login에서', idInput.current);
    dispatch(
      __postLogin({
        email: idInput.current,
        password: passwordInput.current,
      }),
    );
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <Text>Login</Text>
      </View>

      <View>
        <AuthInput placeholder="id" refInput={idInput} />

        <AuthInput placeholder="password" refInput={passwordInput} />
      </View>
      <Button onPress={onSubmitLogin}>하잉!!</Button>
      <AuthNavigateButton isLoginpage />
    </View>
  );
};

export default Login;

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
