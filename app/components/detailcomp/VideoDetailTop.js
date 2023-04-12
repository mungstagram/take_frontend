import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import VideoPlayer from 'react-native-video-controls';

import {Colors, BasicColors} from '../../constants/colors';
import {__getPostDetailData} from '../../redux/modules/commetsSlice';
import {__putLikes} from '../../redux/modules/addContentSlice';
import {__deletePostDetailData} from '../../redux/modules/addContentSlice';
import Delete from '../svg/Delete';
import ServicesImg from '../svg/ServicesImg';
import CommentList from './CommentList';
import MyText from '../common/MyText';

const VideoDetailTop = ({detail, videoUrl}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginNick = useSelector(
    state => state.profile.myProfile[0].user.nickname,
  );
  const userNick = detail.nickname;
  //게시물 편집 버튼
  const onEditHandler = () => {
    navigation.navigate('ModifyVideo', {postId: detail.postId});
  };

  //게시물 삭제 버튼
  const onDeleteHandler = () => {
    Alert.alert(
      '작성하신 게시글을 삭제하시겠습니까?',
      '🐾 진짜 지우실건가요 ~?',
      [
        {
          text: '취소하기',
          onPress: () => console.log('취소'),
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => {
            Alert.alert('귀여운 댕댕이영상이 지워졌습니다😭'),
              dispatch(__deletePostDetailData({postId: detail.postId})),
              navigation.navigate('VideoBoard', {postId: detail.postId});
          },
        },
      ],
    );
  };

  //유저 디테일페이지 이동
  const moveToUserDetail = nickname => {
    navigation.navigate('Search', {
      screen: 'UserDetail',
      params: {nickname},
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.detailTop}>
          <Pressable
            onPress={() => moveToUserDetail(detail.nickname)}
            style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
            <FastImage
              style={styles.profileImg}
              source={{
                uri: detail.profileUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={'cover'}
            />
          </Pressable>

          <View style={styles.userInfo}>
            <MyText style={styles.nicknameText}>{detail.nickname}</MyText>
            <Text style={styles.timeText}>{detail.createdAt}</Text>
          </View>
          {userNick === loginNick ? (
            <View style={styles.contentControl}>
              <Pressable style={styles.editBtn} onPress={onEditHandler}>
                <ServicesImg
                  gray
                  titleText={detail.title}
                  contentText={detail.content}
                />
              </Pressable>
              <Pressable style={styles.deleteBtn} onPress={onDeleteHandler}>
                <Delete gray />
              </Pressable>
            </View>
          ) : (
            <View style={styles.contentControl}></View>
          )}
        </View>
        <View style={styles.controlBox}>
          <VideoPlayer source={{uri: videoUrl}} disableBack disableFullscreen />
        </View>
        <View style={styles.listBox}>
          <CommentList userNick />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoDetailTop;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    width: videoCardWidth,
    backgroundColor: BasicColors.whiteColor,
  },
  detailTop: {
    backgroundColor: BasicColors.whiteColor,
    flexDirection: 'row',
    paddingVertical: '2%',
    paddingHorizontal: '4%',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    width: videoCardWidth,
    alignItems: 'center',
  },
  profileImg: {
    width: 24,
    height: 24,
    backgroundColor: BasicColors.grayColor,
    borderRadius: 100,
    marginRight: 10,
  },
  userInfo: {
    width: '75%',
  },
  nicknameText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 8,
    fontFamily: 'Pretendard-Light',
    color: '#C8C8C8',
  },
  contentControl: {
    flexDirection: 'row',
  },
  editBtn: {
    width: 24,
    height: 24,
    marginHorizontal: '6%',
  },
  deleteBtn: {
    width: 24,
    height: 24,
    marginHorizontal: '6%',
  },
  controlBox: {
    width: videoCardWidth,
    height: videoCardHeight * 0.703,
    backgroundColor: BasicColors.blackColor,
  },
  videoScreen: {
    width: videoCardWidth,
    height: videoCardHeight * 0.703,
    backgroundColor: BasicColors.blackColor,
  },
  conmmentList: {
    padding: '2%',
  },
});
