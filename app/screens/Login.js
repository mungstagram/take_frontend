import React, {useRef, useState} from 'react';
import {Alert, View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import AuthInput from '../components/AuthInput';
import AuthButton from '../components/common/AuthButton';
import {__postLogin} from '../redux/modules/loginSlice';
import AuthNavigateButton from '../components/AuthNavigateButton';

const Login = () => {
  const dispatch = useDispatch();

  const idInput = useRef('');
  const passwordInput = useRef();

  const onSubmitLogin = e => {
    // console.log('login에서', idInput.current);
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
        <AuthNavigateButton />
      </View>

      <View>
        <AuthInput placeholder="id" refInput={idInput} />

        <AuthInput placeholder="password" refInput={passwordInput} />
      </View>
      <AuthButton onPress={onSubmitLogin}>하잉!!</AuthButton>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    // alignItems: 'center',
    backgroundColor: 'white',
    // width: width,
    flex: 1,
  },
  inputContainer: {
    justifyContent: 'center',
    flex: 1,
  },
});
