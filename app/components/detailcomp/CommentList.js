import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

import {Colors, BasicColors} from '../../constants/colors';
import CommentImg from '../svg/CommentImg';
import ServicesImg from '../svg/ServicesImg';
import Delete from '../svg/Delete';
import {__deleteComment, __putComment} from '../../redux/modules/commetsSlice';
import {__getPostDetailData} from '../../redux/modules/commetsSlice';
import {__putLikes} from '../../redux/modules/addContentSlice';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';
import TaskImg from '../svg/TaskImg';
import MyText from '../common/MyText';

const CommentList = () => {
  const dispatch = useDispatch();

  //댓글 리스트
  const commentList = useSelector(state => state.comments.comments);
  const detail = useSelector(state => state.comments.detail);
  console.log('de', detail);

  //좋아요 상태
  const [isLiked, setIsLiked] = useState(false);

  // 좋아요 버튼
  const onIsLikeHandler = () => {
    if (isLiked === false) {
      setIsLiked(true);
      dispatch(__putLikes({postId: detail.postId}));
    } else {
      setIsLiked(false);
      dispatch(__putLikes({postId: detail.postId}));
    }
  };

  const [line, setLine] = useState(2);
  const [isActivated, setIsActivated] = useState(false);

  const handleLine = () => {
    isActivated ? setLine(2) : setLine(Number.MAX_SAFE_INTEGER);
    setIsActivated(prev => !prev);
  };

  //플랫리스트의 헤더 부분
  const detailContent = () => {
    return (
      <View>
        <View style={styles.detailBottom}>
          <View style={styles.preContent}>
            <MyText style={styles.titleText}>{detail.title}</MyText>
            <View style={styles.favoritBox}>
              <Pressable onPress={onIsLikeHandler}>
                {detail.isLiked ? <Favorite big /> : <NotFavorite big />}
              </Pressable>
              <MyText>{detail.likesCount}</MyText>
            </View>
          </View>
          <View style={styles.contentText}>
            <MyText numberOfLines={line} ellipsizeMode="tail">
              {detail.content}
            </MyText>
          </View>
        </View>
        <View style={styles.commentCountBox}>
          <View style={styles.commentIcon}>
            <CommentImg />
          </View>
          <MyText>{commentList.length}</MyText>
        </View>
      </View>
    );
  };

  //댓글 수정 인풋형태 변경 상태
  const [edit, setEdit] = useState(false);

  //댓글 수정 버튼
  const onEditHandler = () => {
    setEdit(edit => !edit);
  };

  //댓글 값 변경
  const [editComment, setEditComment] = useState('');

  const onEditComment = () => {
    setEditComment();
  };

  //댓글 수정 완료 버튼

  const onDoneComment = () => {
    dispatch(
      __putComment({
        commentId: detail.comments[0].id,
        id: detail.comments[0].id,
        comment: editComment,
      }),
    );
  };

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

  //플랫리스트 돌리기
  const renderItem = ({item}) => {
    return (
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

        {!edit ? (
          <View style={styles.profileData}>
            <View>
              <View style={styles.profileRow}>
                <MyText>{item.nickname}</MyText>
                <MyText style={styles.timeText}>{item.createdAt}</MyText>
              </View>
              <MyText>{item.comment}</MyText>
            </View>
          </View>
        ) : (
          <View style={styles.profileData}>
            <View>
              <View style={styles.profileRow2}>
                <MyText>{item.nickname}</MyText>
                <MyText style={styles.timeText}>{item.createdAt}</MyText>
              </View>
              <TextInput
                style={styles.inputBorder}
                onChangeText={onEditComment}>
                {item.comment}
              </TextInput>
            </View>
          </View>
        )}

        <View style={styles.contentControl}>
          {!edit ? (
            <Pressable
              style={styles.editBtn}
              value
              onPress={edit => {
                onEditHandler(!edit[0], edit[1]), onDoneComment();
              }}>
              <ServicesImg />
            </Pressable>
          ) : (
            <Pressable
              style={styles.editBtn}
              value
              onPress={edit => {
                onEditHandler(!edit[0], edit[1]), onDoneComment();
              }}>
              <TaskImg />
            </Pressable>
          )}

          <Pressable style={styles.deleteBtn} onPress={onDeleteHandler}>
            <Delete />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <>
      {isActivated ? (
        //상세보기
        <View style={styles.listBoxLong}>
          <FlatList
            ListHeaderComponent={detailContent}
            data={commentList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.listinBox2}
            horizontal={false}
            nestedScrollEnabled={true}
          />
        </View>
      ) : (
        //간략보기
        <View style={styles.listBoxShort}>
          <View style={styles.preContent}>
            <MyText style={styles.titleText}>{detail.title}</MyText>
            <View style={styles.favoritBox}>
              <Pressable onPress={onIsLikeHandler}>
                {detail.isLiked ? <Favorite big /> : <NotFavorite big />}
              </Pressable>
              <MyText>{detail.likesCount}</MyText>
            </View>
          </View>
          <View style={styles.contentText}>
            <MyText numberOfLines={line} ellipsizeMode="tail">
              {detail.content}
            </MyText>
            <Pressable onPress={prev => handleLine(!prev[0], prev[1])}>
              <MyText>더보기</MyText>
            </Pressable>
          </View>
          <View style={styles.container}>
            <View style={styles.commentCountBox}>
              <View style={styles.commentIcon}>
                <CommentImg />
              </View>
              <MyText>{commentList.length}</MyText>
            </View>
            <View style={styles.listBox}>
              <FlatList
                data={commentList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.listinBox}
                horizontal={false}
                nestedScrollEnabled={true}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default CommentList;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.9;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
  },
  listBoxLong: {
    height: windowHeight * 0.44,
    padding: '2%',
  },
  listBoxShort: {
    height: windowHeight * 0.44,
    padding: '2%',
  },
  // 제목, 내용 스타일
  detailBottom: {
    backgroundColor: BasicColors.whiteColor,
  },
  preContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  favoritBox: {
    alignItems: 'center',
  },
  contentScroll: {},
  contentText: {
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  // 댓글 리스트
  commentCountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
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
  profileRow2: {
    top: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 8,
  },
  inputBorder: {
    borderBottomWidth: 1,
    borderBottomColor: BasicColors.grayColor,
    // borderRadius: 4,
    height: 36,
    padding: 3,
    marginTop: 12,
    bottom: 4,
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
    height: videoCardHeight * 0.86,
  },
  listinBox2: {
    height: videoCardHeight * 0.86,
  },
});
