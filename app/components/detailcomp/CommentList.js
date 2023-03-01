import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import React from 'react';

import {Colors, BasicColors} from '../../constants/colors';
import CommentImg from '../svg/CommentImg';

const CommentList = ({detail}) => {
  //댓글 리스트
  const renderItem = ({item}) => {
    return (
      <View style={styles.commentBox}>
        <View style={styles.profileImg}></View>
        <View style={styles.profileData}>
          <View style={styles.profileRow}>
            <Text>UserName</Text>
            <Text>Time</Text>
          </View>
          <Text>text</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.commentCountBox}>
        <View style={styles.commentIcon}>
          <CommentImg />
        </View>
        <Text>{detail.commentsCount}</Text>
      </View>
      <View>
        <FlatList data={detail} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default CommentList;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.9;
//const videoCardHeight = videoCardWidth;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  commentCountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    //padding: '2%',
    backgroundColor: BasicColors.whiteColor,
    paddingHorizontal: '4%',
  },
  commentIcon: {
    marginRight: '2%',
  },
  commentBox: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '4%',
    backgroundColor: BasicColors.whiteColor,
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: BasicColors.grayColor,
    marginRight: '4%',
  },
  profileData: {
    width: windowWidth * 0.51,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
