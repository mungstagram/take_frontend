import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Colors, BasicColors} from '../../constants/colors';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';

import CommentImg from '../svg/CommentImg';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';

const VideoCard = ({videoContent}) => {
  const videoUrl = videoContent.contentUrl[0];
  //console.log('비디오내용', videoContent);

  return (
    <>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.contentTop}>
            <FastImage
              style={styles.profileimg}
              source={{
                uri: videoContent.profileUrl[0],
                priority: FastImage.priority.normal,
              }}
              resizeMode={'contain'}
            />
            <View>
              <Text style={styles.nicknameText}>{videoContent.nickname}</Text>
              <Text style={styles.timeText}>{videoContent.createdAt}</Text>
            </View>
          </View>
          <View>
            {/* <Video
              style={styles.videoScreen}
              source={{
                uri: videoUrl,
              }}
              paused={true}
              resizeMode={'cover'}
            /> */}
            <FastImage
              style={styles.videoScreen}
              source={{
                uri: videoUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.preContent}>
            <Text style={styles.titleText}>{videoContent.title}</Text>
            <View style={styles.subBox}>
              <View style={styles.iconCount}>
                <View style={styles.iconRow}>
                  <NotFavorite />
                  <Text style={styles.text}>{videoContent.likesCount}</Text>
                  {/* likesCount */}
                </View>
                <View style={styles.iconRow}>
                  <CommentImg />
                  <Text style={styles.text}>{videoContent.commentCount}</Text>
                  {/* commentCount */}
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default VideoCard;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth - 40;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    width: videoCardWidth,
    height: videoCardHeight,
    backgroundColor: BasicColors.blackColor,
    borderRadius: 4,
    justifyContent: 'center',
    marginTop: videoCardHeight * 0.1,
    shadowColor: BasicColors.blackColor,
    elevation: 4,
  },
  contentTop: {
    backgroundColor: BasicColors.whiteColor,
    flexDirection: 'row',

    padding: '2%',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  profileimg: {
    width: 24,
    height: 24,
    backgroundColor: '#9d9c9c',
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
  },
  preContent: {
    height: videoCardHeight * 0.26,
    backgroundColor: '#ffffff',
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
    padding: '2%',
    justifyContent: 'center',
  },
  iconCount: {
    flexDirection: 'row',
    width: videoCardWidth * 0.5,
  },
  iconRow: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
  subBox: {},
  titleText: {
    height: '60%',
    fontSize: 20,
    fontWeight: 'bold',
    color: BasicColors.blackColor,
  },
  text: {
    marginLeft: 4,
    color: BasicColors.grayColor,
  },
});
