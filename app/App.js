import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Login from './screens/Login';
import Signup from './screens/Signup';
import UserDetail from './screens/UserDetail';
import {Colors} from './constants/colors';
import {Provider} from 'react-redux';
import store from './redux/store/configStore';
import LoginChecker from './components/LoginChecker';

import BottomTabNav from './components/BottomTabNav';

import Home from './screens/Home';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

// 로그인전 이용하는 스크린
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

// 로그인 후 이동하는 screen
// TODO: 페이지들 넣기, screenOptions 지울듯
const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  const {isLogin} = useSelector(state => state.login);
  console.log(isLogin);
  return (
    <NavigationContainer>
      {!isLogin && <AuthStack />}
      {isLogin && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const App = () => {
  console.log('test');
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle={'dark-content'} />
        <LoginChecker />
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  // screen: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

export default App;
