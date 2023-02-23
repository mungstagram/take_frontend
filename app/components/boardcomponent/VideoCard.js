import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {Colors, BasicColors} from '../../constants/colors';

import CommentImg from '../svg/CommentImg';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';

const VideoCard = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentTop}>
          <View style={styles.profileimg}></View>
          <View>
            <Text>UserNickName</Text>
            <Text>Time</Text>
          </View>
        </View>
        <View>
          <Text>영상썸네일</Text>
        </View>
        <View style={styles.preContent}>
          <Text style={styles.titleText}>Title</Text>
          <View style={styles.subBox}>
            <View style={styles.iconCount}>
              <NotFavorite />
              <Text style={styles.text}>000</Text>
              <CommentImg />
              <Text style={styles.text}>000</Text>
            </View>
            <Text>Time</Text>
          </View>
        </View>
      </View>
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
    backgroundColor: '#bababa',
    borderRadius: 4,
    justifyContent: 'space-between',
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
  contentTop: {
    backgroundColor: BasicColors.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
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
  preContent: {
    height: videoCardHeight * 0.34,
    backgroundColor: '#ffffff',
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
    padding: '2%',
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
  },
  text: {
    color: BasicColors.grayColor,
  },
});
