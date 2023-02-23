import {wrap} from 'module';
import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Pressable, Modal} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../constants/colors';
import {__getUserDetail} from '../../redux/modules/userDetailSlice';
import GoBackButton from '../common/GoBackButton';

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
              <Text>프버튼</Text>
              <Text>디버튼</Text>
            </View>
          </View>
          <View style={styles.userTextWrapper}>
            <View style={styles.userIntroWrapper}>
              <Text style={styles.textNickName}>{userDetail.nickname}</Text>
              <Text style={styles.textIntroduce}>{userDetail.introduce}</Text>
            </View>
            <View style={styles.userContentCountWrapper}>
              <View>
                <Text>{userDetail.postsCount}</Text>
                <Text>게시글 수</Text>
              </View>
              <View>
                <Text>{userDetail.dogsCount}마리의</Text>
                <Text>댕댕이 집사</Text>
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
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
  },
  userImgWrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: '1.8%',
    alignItems: 'center',
  },
  imageSizer: {
    width: 100,
    height: 100,
    backgroundColor: 'gray',
    overflow: 'hidden',
    borderRadius: 50,
  },
  userImgIconContainer: {
    flexDirection: 'row',
  },
  userTextWrapper: {
    flex: 2,
    height: '100%',
  },
  userIntroWrapper: {backgroundColor: 'green', flex: 402},
  userContentCountWrapper: {backgroundColor: 'blue', flex: 598},
  textNickName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textIntroduce: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  introduceBox: {
    paddingRight: 8,
  },
});
