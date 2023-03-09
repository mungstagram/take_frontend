import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Pressable, Modal} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {Colors} from '../../constants/colors';
import {
  __getUserDetail,
  __getRoomId,
} from '../../redux/modules/userDetailSlice';
import GoBackButton from '../common/GoBackButton';
import AccountCircle from '../svg/AccountCircle';
import MailDm from '../svg/MailDm';
import SendDM from '../svg/SendDM';
import HumanDefaultImage from '../svg/HumanDefaultImage';
import MyText from '../common/MyText';

const UserDetailProf = ({nickname}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [myToken, setMyToken] = useState('');
  // console.log(myToken, '내 토큰');
  // console.log(nickname, '보고 있는 프로필대상');
  const {myNick} = useSelector(state => state.login);
  // console.log(myNick, '내 닉네임');
  const {userDetail} = useSelector(state => state.userDetail);
  console.log(userDetail.contentUrl, '유저 디테일');
  const {targetRoomId} = useSelector(state => state.userDetail);
  // console.log(targetRoomId, 'targetRoomId');

  // 해당 프로필패이지 데이터 얻기
  useEffect(() => {
    dispatch(__getUserDetail(nickname));
  }, []);

  // 내 토큰얻기
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
    navigation.push('MessageBox', {token: myToken});
  };

  //타인에게 dm보내기
  const sendDirectMessageHandler = value => {
    navigation.push('DirectMessage', {value, token: myToken});
  };

  // 대상과의 소켓 룸아이디 얻기
  useEffect(() => {
    dispatch(__getRoomId({receiverNickname: nickname}));
  }, []);

  return (
    <>
      <View style={styles.userWrapper}>
        <View style={styles.userButton}>
          <GoBackButton />
        </View>
        <View style={styles.userProfile}>
          <View style={styles.userImgWrapper}>
            {userDetail.contentUrl === '' ? (
              <View style={styles.imageSizer}>
                <HumanDefaultImage />
              </View>
            ) : (
              <FastImage
                style={styles.imageSizer}
                source={{
                  uri: userDetail.contentUrl,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}

            <View style={styles.userImgIconContainer}>
              <View style={styles.iconAligner}>
                <AccountCircle />
              </View>
              {myNick === nickname ? (
                <Pressable
                  onPress={openDirectMessageHandler}
                  style={styles.iconAligner}>
                  <MailDm />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() =>
                    sendDirectMessageHandler({
                      roomId: targetRoomId,
                      profileUrl: userDetail.contentUrl,
                      nickname: nickname,
                    })
                  }
                  style={styles.iconAligner}>
                  <SendDM />
                </Pressable>
              )}
            </View>
          </View>
          <View style={styles.userTextWrapper}>
            <View style={styles.userIntroWrapper}>
              <MyText style={styles.textNickName}>{nickname}</MyText>
              <MyText style={styles.textIntroduce}>
                {userDetail.introduce}
              </MyText>
            </View>
            <View style={styles.userContentCountWrapper}>
              <View style={styles.userContentCounterContainer}>
                <MyText style={styles.userContetCounterMainText}>
                  {userDetail.postsCount}
                </MyText>
                <MyText style={styles.userContetCounterSubText}>
                  게시글 수
                </MyText>
              </View>
              <View style={styles.userContentCounterContainer}>
                <MyText style={styles.userContetCounterMainText}>
                  {userDetail.dogsCount}마리의
                </MyText>
                <MyText style={styles.userContetCounterSubText}>
                  댕댕이 집사
                </MyText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default UserDetailProf;

const styles = StyleSheet.create({
  userWrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.mainColorBright,
  },
  userButton: {
    height: '22%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '7%',
  },
  userProfile: {
    flexDirection: 'row',
    position: 'absolute',
    top: '22%',
    height: '100%',
    width: '100%',
  },
  userImgWrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '3%',
    alignItems: 'center',
  },
  imageSizer: {
    width: 108,
    height: 108,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImgIconContainer: {
    flexDirection: 'row',
    marginTop: '7%',
  },
  iconAligner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 300,
    elevation: 10,
    margin: '4.5%',
  },
  userTextWrapper: {
    flex: 2,
    height: '100%',
  },
  userIntroWrapper: {flex: 402, paddingLeft: '5%'},
  userContentCountWrapper: {
    flex: 598,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingRight: '10%',
  },
  userContentCounterContainer: {
    paddingTop: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    height: '100%',
    // backgroundColor: 'red',
  },
  userContetCounterMainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  userContetCounterSubText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white',
  },
  textNickName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  textIntroduce: {
    fontSize: 16,
    flexWrap: 'wrap',
    color: 'white',
  },
  introduceBox: {
    paddingRight: 8,
  },
});
