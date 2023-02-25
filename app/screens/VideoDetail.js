import React from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native';

import {Colors, BasicColors} from '../constants/colors';
import Favorite from '../components/svg/Favorite';
import NotFavorite from '../components/svg/NotFavorite';

const VideoDetail = ({videoContent}) => {
  //const videoUrl = videoContent.contentUrl[0];

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.detailTop}>
          <View style={styles.profileImg}></View>
          <View>
            <Text style={styles.nicknameText}>lulu</Text>
            <Text style={styles.timeText}>000</Text>
          </View>
        </View>
        <View style={styles.videoScreen}>
          <Text> 영상자리 </Text>
        </View>
        <View style={styles.detailBottom}>
          <View style={styles.preContent}>
            <Text>Title</Text>
            <View style={styles.favoritBox}>
              <NotFavorite />
              <Text>000</Text>
            </View>
          </View>
          <View style={styles.contentBox}>
            <Text>Content</Text>
            <Text>더보기</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoDetail;

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
