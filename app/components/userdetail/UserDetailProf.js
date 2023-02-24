import {wrap} from 'module';
import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, Modal} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../constants/colors';
import {__getUserDetail} from '../../redux/modules/userDetailSlice';
import GoBackButton from '../common/GoBackButton';
import AccountCircle from '../svg/AccountCircle';
import MailDm from '../svg/MailDm';

const UserDetailProf = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getUserDetail('Seeder1'));
  }, []);

  const {userDetail} = useSelector(state => state.userDetail);
  //{nickname: 'Seeder1', introduce: 'seed1 introduce', contentUrl: 'https://spartabecool.s3.amazonaws.com/image/1676984268618_image3.png', postsCount: 3, dogsCount: 2, …}

  return (
    <>
      <View style={styles.userWrapper}>
        <View style={styles.userButton}>
          <GoBackButton />
        </View>
        <View style={styles.userProfile}>
          <View style={styles.userImgWrapper}>
            <FastImage
              style={styles.imageSizer}
              source={{
                uri: userDetail.contentUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.userImgIconContainer}>
              <View style={styles.iconAligner}>
                <AccountCircle />
              </View>
              <View style={styles.iconAligner}>
                <MailDm />
              </View>
            </View>
          </View>
          <View style={styles.userTextWrapper}>
            <View style={styles.userIntroWrapper}>
              <Text style={styles.textNickName}>{userDetail.nickname}</Text>
              <Text style={styles.textIntroduce}>{userDetail.introduce}</Text>
            </View>
            <View style={styles.userContentCountWrapper}>
              <View style={styles.userContentCounterContainer}>
                <Text style={styles.userContetCounterMainText}>
                  {userDetail.postsCount}
                </Text>
                <Text style={styles.userContetCounterSubText}>게시글 수</Text>
              </View>
              <View style={styles.userContentCounterContainer}>
                <Text style={styles.userContetCounterMainText}>
                  {userDetail.dogsCount}마리의
                </Text>
                <Text style={styles.userContetCounterSubText}>댕댕이 집사</Text>
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
    backgroundColor: 'gray',
    overflow: 'hidden',
    borderRadius: 50,
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
    borderRadius: 50,
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
