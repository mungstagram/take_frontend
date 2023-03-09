import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useNavigation} from '@react-navigation/native';

import {Colors, BasicColors} from '../../constants/colors';
import {__getPostDetailData} from '../../redux/modules/commetsSlice';
import {__putLikes} from '../../redux/modules/addContentSlice';
import {__deletePostDetailData} from '../../redux/modules/addContentSlice';
import Delete from '../svg/Delete';
import ServicesImg from '../svg/ServicesImg';
import CommentList from './CommentList';
import MyText from '../common/MyText';

const ImageDetailTop = ({detail}) => {
  const imageList = detail.contentUrl;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  //게시물 편집 버튼
  const onEditHandler = () => {
    navigation.navigate('ModifyImage', {postId: detail.postId});
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
            Alert.alert('귀여운 댕댕이사진이 지워졌습니다😭'),
              dispatch(__deletePostDetailData({postId: detail.postId})),
              navigation.navigate('ImageBoard', {postId: detail.postId});
          },
        },
      ],
    );
  };

  //사진 미리보기
  const renderItem = ({item}) => {
    return (
      <ScrollView style={styles.imageView}>
        <Image
          source={{
            uri: item,
          }}
          style={styles.imageScreen}
          resizeMode="contain"
        />
      </ScrollView>
    );
  };

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
            <MyText style={styles.nicknameText}>{detail.nickname}</MyText>
            <MyText style={styles.timeText}>{detail.createdAt}</MyText>
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
        <View style={styles.scrollBox}>
          <SwiperFlatList
            index={0}
            showPagination
            data={imageList}
            renderItem={renderItem}
            renderAll={true}
            paginationStyleItem={styles.dot}
          />
        </View>
        <CommentList />
      </View>
    </SafeAreaView>
  );
};

export default ImageDetailTop;

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
  imageView: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    position: 'relative',
  },
  scrollBox: {
    width: videoCardWidth,
    height: videoCardHeight * 0.703,
  },
  imageScreen: {
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
  dot: {
    width: 8,
    height: 8,
    borderColor: BasicColors.grayColor,
    borderWidth: 1,
  },
});
