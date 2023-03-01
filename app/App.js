import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';

import Login from './screens/Login';
import AuthStartScreen from './screens/AuthStartScreen';
import Signup from './screens/Signup';
import UserDetail from './screens/UserDetail';
import {Colors} from './constants/colors';
import {Provider} from 'react-redux';
import store from './redux/store/configStore';
import LoginChecker from './components/LoginChecker';
import BottomTabNav from './components/BottomTabNav';
import Home from './screens/Home';
import Profile from './screens/Profile';
import VideoDetail from './screens/VideoDetail';

import InputDogProfileCard from './components/profile/InputDogProfileCard';
import InputPersonProfileCard from './components/profile/InputPersonProfileCard';

const Stack = createNativeStackNavigator();

//그인전 이용하는 스크린
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthStartScreen"
        component={AuthStartScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// 로그인 후 이동하는 screen
// TODO: 페이지들 넣기, screenOptions 지울듯
const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.mainColorBright},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.mainColorBright},
      }}>
      <Stack.Screen
        name="BottomTabNav"
        component={BottomTabNav}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen name="VideoDetail" component={VideoDetail} />
      <Stack.Screen
        name="InputDogProfileCard"
        component={InputDogProfileCard}
      />
      <Stack.Screen
        name="InputPersonProfileCard"
        component={InputPersonProfileCard}
      />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  const {isLogin} = useSelector(state => state.login);
  // console.log(isLogin);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      {!isLogin && <AuthStack />}
      {isLogin && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

const App = () => {
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
