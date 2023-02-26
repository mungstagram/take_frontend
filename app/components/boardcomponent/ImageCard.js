import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import CommentImg from '../svg/CommentImg';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';
const ImageCard = ({imageContent}) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.profileWriterWrapper}>
        <FastImage
          style={styles.profileImageWrapper}
          source={{
            uri:
              imageContent.profileUrl.length === 0
                ? ''
                : imageContent.profileUrl[0],
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.profileTextWrapper}>
          <Text style={styles.nicknameFont}>{imageContent.nickname}</Text>
          <Text style={styles.dateFont}>{imageContent.createdAt}</Text>
        </View>
      </View>
      <FastImage
        style={styles.imageWrapper}
        source={{
          uri:
            imageContent.contentUrl.length === 0
              ? ''
              : imageContent.contentUrl[0],
          // uri: item.contentUrl === null ? '' : item.contentUrl[0],
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.contentDetailBox}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleFont}>
          {imageContent.title}
        </Text>
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
  profileImageWrapper: {
    width: 24,
    height: 24,
    backgroundColor: 'gray',
    borderRadius: 200,
    marginLeft: '4%',
  },
  profileTextWrapper: {
    marginLeft: '5%',
  },
  cardWrapper: {
    width: '90.3%',
    backgroundColor: 'white',
    elevation: 4,
    marginBottom: 16,
    borderRadius: 4,
  },
  contentDetailBox: {
    marginTop: 12,
    paddingHorizontal: '4%',
    marginBottom: 8,
  },
  iconBox: {
    flexDirection: 'row',
    height: 24,
    alignItems: 'flex-end',
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
    height: 12,
    fontSize: 8,
  },
  nicknameFont: {
    heigth: 20,
    fontSize: 12,
  },
  profileWriterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
});
