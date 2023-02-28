import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

import {Colors, BasicColors} from '../../constants/colors';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';
import GoBackButton from '../common/GoBackButton';

const VideoDetailTop = ({detail, videoUrl}) => {
  // 에러발생 왜 에러나는지 찾아봐야함 났다 안났다;;

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

        <Video
          style={styles.videoScreen}
          source={{
            uri: videoUrl,
          }}
          resizeMode={'contain'}
          repeat={true}
        />
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
    height: videoCardHeight,
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
