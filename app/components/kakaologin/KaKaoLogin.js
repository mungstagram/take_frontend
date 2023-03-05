import {Pressable, StyleSheet, Text, View, Alert, Image} from 'react-native';
import React, {useState} from 'react';
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  unlink,
} from '@react-native-seoul/kakao-login';
import {useDispatch} from 'react-redux';
import {__postKaKaoLogin} from '../../redux/modules/loginSlice';

const KaKaoLogin = () => {
  const dispatch = useDispatch();
  const signInWithKakao = async () => {
    try {
      const token = await login();
      dispatch(__postKaKaoLogin({accessToken: token.accessToken}));
    } catch (err) {
      Alert.alert('login err');
    }
  };

  // const signOutWithKakao = async () => {
  //   try {
  //     const message = await logout();

  //     setResult(message);
  //   } catch (err) {
  //     console.error('signOut error', err);
  //   }
  // };

  // const getProfile = async () => {
  //   try {
  //     const profile = await getKakaoProfile();

  //     setResult(JSON.stringify(profile));
  //   } catch (err) {
  //     console.error('signOut error', err);
  //   }
  // };

  // const unlinkKakao = async () => {
  //   try {
  //     const message = await unlink();

  //     setResult(message);
  //   } catch (err) {
  //     console.error('signOut error', err);
  //   }
  // };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>간편하게 로그인하기</Text>

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
