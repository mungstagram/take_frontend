import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Colors, BasicColors} from '../../constants/colors';

const VideoPreviewCard = () => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text>영상썸네일</Text>
        </View>
        <View style={styles.preContent}>
          <Text style={styles.titleText}>제목넣기</Text>
          <View style={styles.subBox}>
            <View style={styles.iconCount}>
              <Text style={styles.text}>좋아요 000</Text>
              <Text style={styles.text}>댓글 000</Text>
            </View>
            <Text>작성시간</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default VideoPreviewCard;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth - 40;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    width: videoCardWidth,
    height: videoCardHeight,
    backgroundColor: '#af6161',
    borderRadius: 4,
    justifyContent: 'flex-end',
    marginTop: 16,
    shadowColor: BasicColors.blackColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
  },
  preContent: {
    height: videoCardHeight * 0.34,
    backgroundColor: '#ffffff',
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
  },
  iconCount: {
    flexDirection: 'row',
  },
  subBox: {},
  titleText: {
    height: '40%',
    fontSize: 20,
    fontWeight: 'bold',
    color: BasicColors.blackColor,
    padding: '2%',
  },
  text: {
    color: BasicColors.grayColor,
  },
});
