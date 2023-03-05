import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import VideoPlayer from 'react-native-video-controls';

import {Colors, BasicColors} from '../../constants/colors';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';
import {__putLikes} from '../../redux/modules/addContentSlice';
import Delete from '../svg/Delete';
import ServicesImg from '../svg/ServicesImg';
import {__deletePostDetailData} from '../../redux/modules/addContentSlice';
import CommentList from './CommentList';

const VideoDetailTop = ({detail, videoUrl}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [line, setLine] = useState(2);
  const [isActivated, setIsActivated] = useState(false);

  const handleLine = () => {
    //console.log('ac', isActivated);
    isActivated ? setLine(2) : setLine(Number.MAX_SAFE_INTEGER);
    setIsActivated(prev => !prev);
  };

  //좋아요 상태
  const [isLiked, setIsLiked] = useState(false);

  // 좋아요 버튼
  const onIsLikeHandler = () => {
    if (isLiked === false) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

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
            Alert.alert('귀여운 댕댕이영상이 지워졌습니다😱'),
              dispatch(__deletePostDetailData({postId: detail.postId})),
              navigation.navigate('VideoBoard', {postId: detail.postId});
          },
        },
      ],
    );
  };

  useEffect(() => {
    dispatch(__putLikes({postId: detail.postId, isLiked}));
  }, [isLiked]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.detailTop}>
          <FastImage
            style={styles.profileImg}
            source={{
              uri: detail.profileUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={'cover'}
          />

          <View style={styles.userInfo}>
            <Text style={styles.nicknameText}>{detail.nickname}</Text>
            <Text style={styles.timeText}>{detail.createdAt}</Text>
          </View>
          <View style={styles.contentControl}>
            <Pressable style={styles.editBtn} onPress={onEditHandler}>
              <ServicesImg />
            </Pressable>
            <Pressable style={styles.deleteBtn} onPress={onDeleteHandler}>
              <Delete />
            </Pressable>
          </View>
        </View>
        <View style={styles.controlbox}>
          <VideoPlayer source={{uri: videoUrl}} disableBack disableFullscreen />
        </View>

        {isActivated ? (
          <>
            <ScrollView style={styles.contentScroll} nestedScrollEnabled={true}>
              <View style={styles.detailBottom}>
                <View style={styles.preContent}>
                  <Text style={styles.titleText}>{detail.title}</Text>
                  <View style={styles.favoritBox}>
                    <Pressable onPress={onIsLikeHandler}>
                      {detail.isLiked ? <Favorite big /> : <NotFavorite big />}
                    </Pressable>
                    <Text>{detail.likesCount}</Text>
                  </View>
                </View>
                <View style={styles.contentText}>
                  <Text numberOfLines={line} ellipsizeMode="tail">
                    {detail.content}
                  </Text>
                </View>
                <CommentList />
              </View>
            </ScrollView>
          </>
        ) : (
          <>
            <View style={styles.detailBottom}>
              <View style={styles.preContent}>
                <Text style={styles.titleText}>{detail.title}</Text>
                <View style={styles.favoritBox}>
                  <Pressable onPress={onIsLikeHandler}>
                    {detail.isLiked ? <Favorite big /> : <NotFavorite big />}
                  </Pressable>
                  <Text>{detail.likesCount}</Text>
                </View>
              </View>
              <View style={styles.contentText}>
                <Text numberOfLines={line} ellipsizeMode="tail">
                  {detail.content}
                </Text>
                <Pressable onPress={prev => handleLine(!prev[0], prev[1])}>
                  <Text>더보기</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.conmmentList}>
              <CommentList />
            </View>
          </>
        )}
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

    width: '100%',
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
  controlbox: {
    width: videoCardWidth,
    height: videoCardHeight * 0.703,
    backgroundColor: BasicColors.blackColor,
  },
  videoScreen: {
    width: videoCardWidth,
    height: videoCardHeight * 0.703,
    backgroundColor: BasicColors.blackColor,
  },
  detailBottom: {
    backgroundColor: BasicColors.whiteColor,
    //height: videoCardHeight * 0.3,
    padding: '2%',
  },
  preContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //height: '60%',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  favoritBox: {
    alignItems: 'center',
  },
  contentScroll: {
    height: windowHeight,
  },
  contentText: {
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  conmmentList: {
    padding: '2%',
  },
});
