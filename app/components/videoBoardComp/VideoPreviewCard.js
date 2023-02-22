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
          <Text>제목넣기</Text>
          <View style={styles.subBox}>
            <View style={styles.iconCount}>
              <Text>좋아요 000</Text>
              <Text>댓글 000</Text>
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

const videoWidth = windowWidth - 40;
const videoHeight = videoWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    width: videoWidth,
    height: videoHeight,
    backgroundColor: '#af6161',
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  preContent: {
    height: videoHeight * 0.34,
    backgroundColor: '#ffffff',
  },
  iconCount: {
    flexDirection: 'row',
  },
  subBox: {
    // color: BasicColors.grayColor,
  },
});
