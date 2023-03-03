import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import {Colors, BasicColors} from '../../constants/colors';
import CommentImg from '../svg/CommentImg';

const CommentList = ({detail}) => {
  console.log('detail', detail);
  // //댓글 리스트
  const commentList = detail.comments;
  console.log('list', commentList);

  const renderItem = ({item}) => {
    return (
      <ScrollView style={styles.commentView}>
        <View style={styles.commentBox}>
          <View style={styles.profileImg}>
            <FastImage
              style={styles.profileImg}
              source={{
                uri: item.profileUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.profileData}>
            <View style={styles.profileRow}>
              <Text>{item.userId}</Text>
              <Text>{item.createdAt}</Text>
            </View>
            <Text>{item.comment}</Text>
          </View>
        </View>
      </ScrollView>
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
      <View style={styles.listBox}>
        <FlatList
          data={commentList}
          renderItem={renderItem}
          keyExtractor={index => index}
          style={styles.listinBox}
          contentContainerStyle={{flexGrow: 1}}
        />
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
    height: windowHeight,
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
  commentView: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    position: 'relative',
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
  listBox: {
    height: windowHeight,
  },
});
