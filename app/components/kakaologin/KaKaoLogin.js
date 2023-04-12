import {Pressable, StyleSheet, Text, View, Alert, Image} from 'react-native';
import React, {useState} from 'react';
import {
  login,
  getProfile as getKakaoProfile,
} from '@react-native-seoul/kakao-login';
import {useDispatch} from 'react-redux';
import {__postKaKaoLogin} from '../../redux/modules/loginSlice';
import MyText from '../common/MyText';

const KaKaoLogin = () => {
  const dispatch = useDispatch();
  const signInWithKakao = async () => {
    try {
      const token = await login();
      dispatch(__postKaKaoLogin({accessToken: token.accessToken}));
    } catch (err) {
      console.log(err);
      Alert.alert('카카오 로그인에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <MyText style={styles.text}>간편하게 로그인하기</MyText>

      <Pressable
        style={styles.button}
        onPress={() => {
          signInWithKakao();
        }}>
        <Image
          source={require('../../assets/kakao_login_medium_narrow.png')}
          resizeMode={'cover'}
        />
      </Pressable>
    </View>
  );
};

export default KaKaoLogin;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 32,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
  },
});
