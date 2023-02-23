import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AuthButton from '../components/common/AuthButton';
import ForceLoginButton from '../components/common/ForceLoginButton';
import {newSignup} from '../redux/modules/loginSlice';
import {useDispatch} from 'react-redux';
const AuthStartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // navigate 함수
  const navigateLoginHandler = () => {
    navigation.navigate('Login');
  };
  const navigateSignUpHandler = () => {
    navigation.navigate('Signup');
  };

  //회원가입 성공시 true로 변경된 isSuccessedSignup 전역변수를 다시 false로 초기화
  useEffect(() => {
    dispatch(newSignup());
  }, []);

  return (
    <View style={styles.Wrapper}>
      <View style={styles.Container1}>
        <Text> 로그인 시작</Text>
        <ForceLoginButton></ForceLoginButton>
      </View>
      <View style={styles.Container2}>
        <View style={styles.ButtonContainer}>
          <AuthButton onPress={navigateLoginHandler}> 로그인</AuthButton>
        </View>
        <View style={styles.ButtonContainer}>
          <AuthButton border={true} onPress={navigateSignUpHandler}>
            회원가입
          </AuthButton>
        </View>
      </View>
    </View>
  );
};

export default AuthStartScreen;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  Container1: {
    flex: 4,
    backgroundColor: 'transparent',
  },
  Container2: {
    flex: 6,
    marginHorizontal: '20%',
    flexDirection: 'column',
    // gap: '100',
  },
  ButtonContainer: {
    marginVertical: '3%',
  },
});
