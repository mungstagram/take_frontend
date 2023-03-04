import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

import {Colors, BasicColors} from '../../constants/colors';
import CommentImg from '../svg/CommentImg';
import ServicesImg from '../svg/ServicesImg';
import Delete from '../svg/Delete';
import {__deleteComment} from '../../redux/modules/commetsSlice';
import {__getPostDetailData} from '../../redux/modules/commetsSlice';

const CommentList = ({detail}) => {
  const dispatch = useDispatch();

  //댓글 리스트
  const commentList = useSelector(state => state.comments.comments);
  console.log('Cl', commentList);
  //댓글 수정 상태
  const [edit, setEdit] = useState(false);

  //댓글 수정 버튼
  const onEditHandler = () => {};

  //댓글 삭제 버튼
  const onDeleteHandler = () =>
    Alert.alert('이 댓글을 삭제하시겠습니까?', '', [
      {
        text: '취소하기',
        onPress: () => console.log('취소'),
        style: 'cancel',
      },
      {
        text: '네',
        onPress: () => {
          Alert.alert('댓글이 삭제되었습니다.'),
            dispatch(__deleteComment({commentId: commentList[0].id}));
        },
      },
    ]);

  // 플랫리스트 돌리기
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
            <View>
              <View style={styles.profileRow}>
                <Text>{item.nickname}</Text>
                <Text style={styles.timeText}>{item.createdAt}</Text>
              </View>
              <Text>{item.comment}</Text>
            </View>
          </View>
          <View style={styles.contentControl}>
            <Pressable style={styles.editBtn} onPress={onEditHandler}>
              <ServicesImg />
            </Pressable>
            <Pressable style={styles.deleteBtn} onPress={onDeleteHandler}>
              <Delete />
            </Pressable>
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
        <Text>{commentList.length}</Text>
      </View>
      <View style={styles.listBox}>
        <FlatList
          data={commentList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.listinBox}
          horizontal={false}
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
    paddingHorizontal: '4%',
    backgroundColor: BasicColors.whiteColor,
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
    width: windowWidth * 0.6,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 8,
  },
  contentControl: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: '11%',
  },
  editBtn: {
    width: 24,
    height: 24,
    marginHorizontal: '6%',
  },
  deleteBtn: {
    width: 24,
    height: 24,
    marginHorizontal: '6%',
  },
  listBox: {},
  listinBox: {
    height: '30%',
  },
});
