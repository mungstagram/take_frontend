import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {__getProfile} from '../redux/modules/profileSlice';
import Logout from '../components/Logout';
import GoBackButton from '../components/common/GoBackButton';
import PersonProfileCard from '../components/profile/PersonProfileCard';

import AddDogProfile from '../components/profile/AddDogProfile';
import MyText from '../components/common/MyText';
import {__deleteUsers} from '../redux/modules/loginSlice';
import DogCard from '../components/profile/DogCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  // 프로필 정보
  const {profile} = useSelector(state => state.profile);
  //내 닉네임
  const myNick = useSelector(state => state.profile.myProfile[0].user.nickname);
  const {nickname} = route.params;
  const onDeleteUsersData = () => {
    Alert.alert(
      '',
      '펍플루언서를 다시 사용할 일이 없어 계정을 없애고 싶으시면 계정 삭제를 처리해드리겠습니다. 삭제된 계정은 다시 복구 할 수 없고 계정의 게시글이나 정보는 완전히 삭제된다는 점을 기억해 주세요.',

      [
        {
          text: '취소하기',
        },
        {
          text: '확인',
          onPress: () =>
            Alert.alert('', `진짜... 삭제하시는 거죠...?\n보고 싶 거예요...`, [
              {
                text: '취소하기',
              },
              {text: '확인', onPress: () => dispatch(__deleteUsers())},
            ]),
        },
      ],
    );
  };
  useEffect(() => {
    dispatch(__getProfile(nickname));
  }, [isFocused]);

  return (
    <KeyboardAwareScrollView
      // style={styles.Wrapper}
      contentContainerStyle={styles.Wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{width: '100%', height: '100%'}}>
            <View style={styles.linkBtn}>
              <View>
                <GoBackButton />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  right: '7%',
                  alignItems: 'center',
                }}>
                <Pressable onPress={onDeleteUsersData}>
                  <MyText style={{fontSize: 11, paddingRight: 8}}>
                    회원탈퇴
                  </MyText>
                </Pressable>
                <View
                  style={{
                    borderLeftColor: '#C8C8C8',
                    borderLeftWidth: 1,
                    height: 12,
                    width: 8,
                  }}
                />
                <Logout />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.top}>
          <View style={{bottom: '15%'}}>
            <PersonProfileCard
              myInfo={profile[0].user}
              nickname={nickname}
              myNick={myNick}
            />
          </View>
        </View>
        <View style={styles.content} />
        <View>
          <ScrollView style={styles.dogDetailWrapper} horizontal={true}>
            <View style={{width: 32}}></View>
            {profile[1].dogs.map(item => (
              <DogCard
                key={item.id}
                dog={item}
                nickname={nickname}
                myNick={myNick}
              />
            ))}
            {myNick === nickname && <AddDogProfile />}
          </ScrollView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    height: windowHeight * 0.945,
    width: windowWidth,
    backgroundColor: '#ffffff',
    bottom: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#ffffff',
    bottom: 0,
  },
  header: {
    width: '100%',
    height: '6.8%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  top: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc988',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  linkBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '6.5%',
    // left: '40%',
    // backgroundColor: 'red',
    top: '4%',
  },
  dogDetailWrapper: {
    position: 'absolute',
    bottom: 30,
    height: 498,
    width: '100%',
  },
});

export default Profile;
