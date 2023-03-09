import {useDispatch} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {checkLogin, setMyNick} from '../redux/modules/loginSlice';
import {Navigation} from '../App';
const LoginChecker = () => {
  //    마운트 될 때, asyncStorage의 토큰 여부를 검사 = > 있으면 checkLogin 리듀서를 통해서   isLogin의 상태 true로 바꿔줌
  const dispatch = useDispatch();

  const [isTryingLogin, setIsTryingLogin] = useState(true);

  // 토큰 있는지 확인, 있으면 로그인 했다.
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('authorization');
      const myNick = await AsyncStorage.getItem('nickname');

      if (storedToken) {
        dispatch(checkLogin());
        dispatch(setMyNick(myNick));
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
