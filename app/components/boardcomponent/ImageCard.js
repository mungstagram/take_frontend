import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {bounce} from 'react-native/Libraries/Animated/Easing';

import CommentImg from '../svg/CommentImg';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';
const ImageCard = ({imageContent}) => {
  console.log(imageContent);
  return (
    <View style={styles.cardWrapper}>
      <FastImage
        style={styles.imageWrapper}
        source={{
          uri: imageContent.contentUrl[0],
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.contentDetailBox}>
        <Text style={styles.titleFont}>{imageContent.title}</Text>
        <View style={styles.iconBox}>
          <View style={styles.iconSize}>
            {imageContent.isLiked ? <NotFavorite /> : <Favorite />}
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countFont}>{imageContent.likesCount}</Text>
          </View>

          <View style={styles.iconSize}>
            <CommentImg />
          </View>
          <View style={styles.countBox}>
            <Text style={styles.countFont}>{imageContent.commentCount}</Text>
          </View>
        </View>
        <Text style={styles.dateFont}>{imageContent.createdAt}</Text>
      </View>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  imageWrapper: {
    width: '100%',
    height: 200,
    backgroundColor: 'gray',
  },

  cardWrapper: {
    width: '95.6%',
  },
  contentDetailBox: {
    marginTop: 12,
  },
  iconBox: {
    flexDirection: 'row',
    // backgroundColor: 'green',
    height: 24,
    alignItems: 'flex-end',
    // justifyContent: 'flex-end',
  },
  iconSize: {
    height: 20,
    justifyContent: 'center',
    marginRight: 4,
  },

  titleFont: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  countBox: {
    justifyContent: 'center',
    height: 20,
    marginRight: 4,
  },
  countFont: {
    fontSize: 12,
  },
  dateFont: {
    height: 20,
    fontSize: 12,
  },
});
