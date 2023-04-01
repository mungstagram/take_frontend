import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {__getHomeProfile} from '../redux/modules/profileSlice';

import TodoList from '../components/todos/TodoList';
import WriteTodo from '../components/todos/WriteTodo';
import Pets from '../components/svg/Pets';
import Emoticon from '../components/svg/Emoticon';
import DogIndexChangeLeft from '../components/svg/DogIndexChangeLeft';
import DogIndexChangeRight from '../components/svg/DogIndexChagneRight';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from '../components/common/MyText';
const windowHeight = Dimensions.get('window').height;

function Home({navigation}) {
  //바텀텝의 높이
  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const [myNick, setMyNick] = useState();
  const isFocused = useIsFocused();
  //data 불러옴
  const profile = useSelector(state => state.profile.myProfile);
  // 몇번쨰 강아지인지
  const [dogIndex, setDogIndex] = useState(0);
  // profile[0] 유저  , profile[1] 강아지
  //
  const {isLoading} = useSelector(state => state.profile);
  // 다음 강아지 혹은 이전 강아지가 있을 때, 다음 혹은 이전 강아지의 정보를 받아오는 함수
  const dogIndexHandler = value => {
    if (value === 'right' && dogIndex !== profile[1]?.dogs?.length - 1) {
      setDogIndex(dogIndex + 1);
    } else if (value === 'left' && dogIndex !== 0) {
      setDogIndex(dogIndex - 1);
    }
  };
  //메시지함으로 가기 위해서 토큰 받기
  const [myToken, setMyToken] = useState('');
  useEffect(() => {
    async function fetctmyToken() {
      const token = await AsyncStorage.getItem('authorization');
      if (token) {
        setMyToken(token);
      }
    }
    fetctmyToken();
  }, []);

  //내 메시지함 열기
  const openDirectMessageHandler = () => {
    !isLoading && myToken && navigation.push('MessageBox', {token: myToken});
  };

  //내 닉네임을 받아오는 함수
  useEffect(() => {
    const getNickName = async () => {
      setMyNick(await AsyncStorage.getItem('nickname'));
    };
    getNickName();
  }, []);

  useEffect(() => {
    dispatch(__getHomeProfile());
  }, [isFocused]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        width: '100%',
        height: windowHeight - tabBarHeight,
      }}>
      <View style={styles.homeProfile}>
        <View style={styles.goToLink}>
          <Pressable
            onPress={() =>
              !isLoading && navigation.push('Profile', {nickname: myNick})
            }>
            <MyText style={styles.homeFontStyle}>프로필</MyText>
          </Pressable>
          <Pressable
            onPress={() =>
              !isLoading && navigation.push('UserDetail', {nickname: myNick})
            }>
            <MyText style={styles.homeFontStyle}>게시글</MyText>
          </Pressable>
          <Pressable onPress={openDirectMessageHandler}>
            <MyText style={styles.homeFontStyle}>메시지</MyText>
          </Pressable>
        </View>
        <View style={styles.homeProfileInner}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={styles.dogIndexLeftSelector}>
              {dogIndex === 0 ? (
                <View
                  style={{
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                  }}
                />
              ) : (
                <Pressable
                  onPress={() => dogIndexHandler('left')}
                  style={{
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                  }}>
                  <DogIndexChangeLeft />
                </Pressable>
              )}
            </View>
            <View style={styles.profileImg}>
              {profile[1]?.dogs.contentUrl === '' ? (
                <View style={styles.dogProfileImg}>
                  <Pets />
                </View>
              ) : (
                <FastImage
                  style={styles.dogProfileImg}
                  source={{
                    uri: profile[1]?.dogs[dogIndex]?.contentUrl,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )}

              {profile[0].user.contentUrl === '' ? (
                <View style={styles.personProfileImg}>
                  <Emoticon />
                </View>
              ) : (
                <FastImage
                  style={styles.personProfileImg}
                  source={{
                    uri: profile[0]?.user.contentUrl,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              )}
            </View>
            <View style={styles.dogIndexRightSelector}>
              {(dogIndex === profile[1].dogs.length - 1 &&
                profile[1].dogs.length !== 0) ||
              profile[1].dogs.length === 0 ? (
                <View
                  style={{
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                  }}
                />
              ) : (
                <Pressable
                  onPress={() => dogIndexHandler('right')}
                  style={{
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                  }}>
                  <DogIndexChangeRight />
                </Pressable>
              )}
            </View>
          </View>
          <View style={styles.profileInner}>
            <View style={styles.dogNameBox}>
              {profile[1].dogs.length === 0 ? (
                <Pressable
                  style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}
                  onPress={() =>
                    navigation.push('Profile', {nickname: myNick})
                  }>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: 'black',
                      textAlign: 'center',
                      top: '4%',
                    }}>
                    프로필에서
                  </MyText>
                </Pressable>
              ) : (
                <MyText
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: 'black',
                    textAlign: 'center',
                    top: '4%',
                  }}>
                  {profile[1]?.dogs[dogIndex]?.name}
                </MyText>
              )}
            </View>
            <View style={styles.dDayBox}>
              {profile[1].dogs.length === 0 ? (
                <Pressable
                  onPress={() => navigation.push('Profile', {nickname: myNick})}
                  style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
                  <MyText
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#E79796',
                      textAlign: 'center',
                      top: '4%',
                    }}>
                    강아지를 등록해주세요~
                  </MyText>
                </Pressable>
              ) : (
                <MyText
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#ffb284',
                    textAlign: 'center',
                    top: '4%',
                  }}>
                  우리가 함께한 날 {profile[1]?.dogs[dogIndex]?.daysWithin}일
                </MyText>
              )}
            </View>
          </View>
        </View>

        <View style={styles.homeTodoBox}>
          <View style={styles.homeTodoBoxInner}>
            <View style={styles.toDoText}>
              {profile[1].dogs.length === 0 ? (
                <MyText
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#262626',
                    marginTop: '4%',
                  }}></MyText>
              ) : (
                <MyText
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#262626',
                    marginTop: '8%',
                  }}>
                  {profile[1]?.dogs[dogIndex]?.species} /{' '}
                  {profile[1]?.dogs[dogIndex]?.age} /{' '}
                  {profile[1]?.dogs[dogIndex]?.weight}Kg
                </MyText>
              )}
            </View>

            <View style={styles.listBox}>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: '#c9c9c9',
                  marginTop: '4%',
                  width: 320,
                }}
              />
              <WriteTodo />
              <TodoList />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  homeProfile: {
    borderWidth: 1,
    backgroundColor: '#ffc988',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  goToLink: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '5.5%',
    marginBottom: 26,
    marginTop: 16,
  },
  homeProfileInner: {
    width: '100%',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeFontStyle: {
    fontSize: 11,
    width: 40,
    height: 24,
    marginTop: 16,
    marginLeft: 16,
    color: '#ffffff',
  },
  dogIndexLeftSelector: {
    justifyContent: 'flex-end',
    marginRight: '20%',
    paddingBottom: 16,
  },
  dogIndexRightSelector: {
    justifyContent: 'flex-end',
    marginLeft: '20%',
    paddingBottom: 16,
  },
  profileImg: {
    width: 120,
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dogProfileImg: {
    width: 96,
    height: 96,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    opacity: 0.7,
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  personProfileImg: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    opacity: 0.7,
    zIndex: 1,
    top: '20%',
    right: '24%',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInner: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  dogNameBox: {
    borderRadius: 14,
    width: 128,
    height: 28,
    paddingTop: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 5,
  },
  dDayBox: {
    marginTop: 8,
    borderRadius: 14,
    width: 208,
    height: 28,
    paddingTop: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    margin: 4,
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 5,
  },
  homeTodoBox: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    marginTop: '4%',
    top: '4%',
  },
  homeTodoBoxInner: {
    // borderWidth: 1,
    borderColor: 'red',
    width: 320,
    marginBottom: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toDoText: {
    // borderWidth: 1,
    right: '26%',
    color: '#000000',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '8%',
  },
  listBox: {
    // borderWidth: 1,
    width: 321,
    height: 408,
  },
});

export default Home;
