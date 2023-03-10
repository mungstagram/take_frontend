import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import AuthInput from '../components/AuthInput';
import AuthButton from '../components/common/AuthButton';
import {__postLogin, deleteFailLog} from '../redux/modules/loginSlice';
import AuthNavigateButton from '../components/AuthNavigateButton';
import KaKaoLogin from '../components/kakaologin/KaKaoLogin';
import MyText from '../components/common/MyText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const windowHeight = Dimensions.get('window').height;

const Login = () => {
  const dispatch = useDispatch();
  const {isSuccessLogin} = useSelector(state => state.login);

  const idInput = useRef('');
  const passwordInput = useRef();
  const [secureSetter, setSecureSetter] = useState(true);
  const onSubmitLogin = e => {
    dispatch(
      __postLogin({
        email: idInput.current,
        password: passwordInput.current,
      }),
    );
  };

  useEffect(() => {
    dispatch(deleteFailLog());
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        width: '100%',
        height: windowHeight,
      }}>
      <View style={styles.wrapper}>
        <View style={styles.buttonPosionter}>
          <AuthNavigateButton />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/LogoMedium.png')}
            resizeMode={'cover'}
          />
          <MyText style={styles.imageText}>로그인하기</MyText>
        </View>
        <View style={styles.inputWrapper}>
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
              <MyText> </MyText>
            ) : (
              <MyText style={styles.helperText}>
                입력하신 정보가 일치하지 않습니다
              </MyText>
            )}
          </View>

          <AuthButton onPress={onSubmitLogin}>입력 완료</AuthButton>
        </View>
        <View style={styles.socialLoginBox}>
          <KaKaoLogin />
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 16,
    marginLeft: '7%',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  imageText: {
    marginTop: 4,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputWrapper: {
    width: '90%',
    backgroundColor: 'white',
    marginTop: 40,
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
  socialLoginBox: {
    width: '100%',
    // marginTop: 100,
  },
});
