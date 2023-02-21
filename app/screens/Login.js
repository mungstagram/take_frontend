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
  const [secureSetter, setSecureSetter] = useState(true);
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
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <AuthInput placeholder="id" refInput={idInput} />
          <AuthInput
            placeholder="password"
            refInput={passwordInput}
            secure={secureSetter}
            setSecureSetter={setSecureSetter}
          />

          <AuthButton onPress={onSubmitLogin}>입력 완료</AuthButton>
        </View>
      </View>
<<<<<<< HEAD
=======
      <AuthButton onPress={onSubmitLogin}>하잉!!</AuthButton>
>>>>>>> develop
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {
<<<<<<< HEAD
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
=======
    // alignItems: 'center',
    backgroundColor: 'white',
    // width: width,
    flex: 1,
>>>>>>> develop
  },
  inputContainer: {
    // width: '90%',
    // height: '60%',
    // justifyContent: 'center',
    // backgroundColor: 'green',
  },

  inputWrapper: {
    // alignItems: 'center',
    width: '90%',
    backgroundColor: 'white',
    position: 'absolute',
    top: '30%',
  },
});
