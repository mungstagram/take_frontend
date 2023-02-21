import React, {useRef, useState} from 'react';
import {Alert, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/common/AuthButton';
import {__postLogin} from '../redux/modules/loginSlice';
import AuthNavigateButton from '../components/AuthNavigateButton';

const Login = () => {
  const dispatch = useDispatch();
  const {isSuccessLogin} = useSelector(state => state.login);

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
      <View style={styles.buttonPosionter}>
        <AuthNavigateButton />
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <AuthInput
            placeholder="id"
            refInput={idInput}
            isInvalid={isSuccessLogin}
          />
          <AuthInput
            placeholder="password"
            refInput={passwordInput}
            secure={secureSetter}
            setSecureSetter={setSecureSetter}
            isInvalid={isSuccessLogin}
          />
          <View style={styles.helperMessageBox}>
            {isSuccessLogin ? (
              <Text> </Text>
            ) : (
              <Text style={styles.helperText}>
                입력하신 정보가 일치하지 않습니다
              </Text>
            )}
          </View>

          <AuthButton onPress={onSubmitLogin}>입력 완료</AuthButton>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  buttonPosionter: {
    position: 'absolute',
    top: '3%',
    left: '5%',
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
  helperMessageBox: {
    alignItems: 'center',
    height: '20%',
  },
  helperText: {
    fontSize: 12,
    color: 'red',
    position: 'absolute',
    top: '20%',
  },
});
