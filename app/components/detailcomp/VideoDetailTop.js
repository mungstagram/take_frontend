import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import VideoPlayer from 'react-native-video-controls';

import {Colors, BasicColors} from '../../constants/colors';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';
import GoBackButton from '../common/GoBackButton';

const VideoDetailTop = ({detail, videoUrl}) => {
  // const videoThumbnail = () => {
  //   return (
  //     <FastImage
  //       source={{
  //         uri: videoUrl,
  //         priority: FastImage.priority.normal,
  //       }}
  //     />
  //   );
  // };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View></View>
        <View style={styles.detailTop}>
          <FastImage
            style={styles.profileImg}
            source={{
              uri: detail.profileUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={'contain'}
          />
          <View>
            <Text style={styles.nicknameText}>{detail.nickname}</Text>
            <Text style={styles.timeText}>{detail.createdAt}</Text>
          </View>
        </View>

        {/* <Video
          style={styles.videoScreen}
          source={{
            uri: videoUrl,
          }}
          resizeMode={'contain'}
          repeat={true}
        /> */}
        <View style={styles.controlbox}>
          <VideoPlayer
            source={{uri: videoUrl}}
            tapAnywhereToPause={true}
            controlAnimationTiming={200}
          />
        </View>
        <View style={styles.detailBottom}>
          <View style={styles.preContent}>
            <Text>{detail.title}</Text>
            <View style={styles.favoritBox}>
              <NotFavorite />
              <Text>{detail.likesCount}</Text>
            </View>
          </View>
          <View style={styles.contentBox}>
            <Text>{detail.content}</Text>
            {/* <Text>더보기</Text> */}
          </View>
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
    padding: '2%',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  profileImg: {
    width: 24,
    height: 24,
    backgroundColor: BasicColors.grayColor,
    borderRadius: 100,
    marginRight: 10,
  },
  nicknameText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 8,
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
    height: videoCardHeight * 0.3,
    padding: '2%',
  },
  preContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60%',
  },
  favoritBox: {
    alignItems: 'center',
  },
  contentBox: {
    flexDirection: 'row',
  },
});
