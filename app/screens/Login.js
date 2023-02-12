import React, {useRef, useState} from 'react';
import {Alert, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';

import AuthInput from '../components/AuthInput';
import Button from '../components/Button';
import {StyleSheet} from 'react-native';

function Login() {
  const dispatch = useDispatch();

  const idInput = useRef();
  const passwordInput = useRef();

  const onSubmitLogin = e => {
    console.log(idInput.current.focus());
    // // dispatch();
    // __postLogin({
    //   memberId: memberIdInput.current.value,
    //   password: passwordInput.current.value,
    // });
    // memberIdInput.current.focus();
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
    </View>
  );
}

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
