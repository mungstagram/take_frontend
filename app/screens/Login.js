import React, {useRef, useState} from 'react';
import {Alert, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import AuthInput from '../components/AuthInput';
import Button from '../components/Button';

function Login() {
  return (
    <>
      <View>
        <Text>Login</Text>
      </View>
      <AuthInput />
      <Button>하잉</Button>
    </>
  );
}

export default Login;
