import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SplashScreen from 'react-native-splash-screen';
// import ReactNative from 'react-native';

import {checkLogin} from '../redux/modules/loginSlice';
import {Navigation} from '../App';
const LoginChecker = () => {
  //    마운트 될 때, asyncStorage의 토큰 여부를 검사 = > 있으면 checkLogin 리듀서를 통해서   isLogin의 상태 true로 바꿔줌
  const dispatch = useDispatch();

  const [isTryingLogin, setIsTryingLogin] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('authorization');

      if (storedToken) {
        dispatch(checkLogin());
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <View></View>;
  }
  return <Navigation />;
};

export default LoginChecker;
