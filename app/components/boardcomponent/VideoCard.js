import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {Colors, BasicColors} from '../../constants/colors';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import CommentImg from '../svg/CommentImg';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';

const VideoCard = ({videoContent}) => {
  const navigation = useNavigation();
  const videoUrl = videoContent.contentUrl[0];

  const onDetailHandler = () => {
    navigation.navigate('VideoDetail', {postId: videoContent.postId});
  };
  return (
    <View style={styles.wrapper}>
      <SafeAreaView>
        <View style={styles.container}>
          <Pressable onPress={onDetailHandler}>
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
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default VideoCard;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth - 40;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  wrapper: {
    top: 18,
  },
  container: {
    width: videoCardWidth,
    height: videoCardHeight,
    backgroundColor: BasicColors.blackColor,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: videoCardHeight * 0.2,
    shadowColor: BasicColors.blackColor,
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
    elevation: 4,
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
