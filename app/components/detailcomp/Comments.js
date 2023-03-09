import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {
  __getPostDetailData,
  __putComment,
} from '../../redux/modules/commetsSlice';
import {__deleteComment} from '../../redux/modules/commetsSlice';
import {useIsFocused} from '@react-navigation/native';

import {Colors, BasicColors} from '../../constants/colors';
import CommentImg from '../svg/CommentImg';
import ServicesImg from '../svg/ServicesImg';
import Delete from '../svg/Delete';
import TaskImg from '../svg/TaskImg';
import TaskImgOn from '../svg/TaskImgOn';
import ScanDelete from '../svg/ScanDelete';

const Comments = ({item, detail}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  //댓글 객체
  const itemData = item.item;
  //댓글 수정 인풋형태 변경 상태
  const [edit, setEdit] = useState(false);
  //댓글 값 변경
  const [editComment, setEditComment] = useState('');
  //댓글 수정 버튼
  const onEditHandler = () => {
    setEdit(edit => !edit);
  };
  //댓글 값 입력
  const onEditComment = e => {
    setEditComment(e);
  };
  //댓글 수정 완료 버튼
  const onDoneHandler = () => {
    if (editComment === '') return;
    Alert.alert('작성하신 댓글을 수정하시겠습니까?', '', [
      {
        text: '취소하기',
        onPress: () => console.log('취소'),
        style: 'cancel',
      },
      {
        text: '네',
        onPress: () => {
          Alert.alert('댓글이 수정되었습니다.'),
            dispatch(
              __putComment({
                commentId: itemData.id,
                id: itemData.id,
                comment: editComment,
              }),
            );

          setEdit(edit => !edit);
        },
      },
    ]);
  };
  //댓글 수정 취소 버튼
  const onEditCancelHandler = () => {
    setEdit(false);
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
            dispatch(__deleteComment({commentId: itemData.id}));
        },
      },
    ]);
  //유저 확인
  const loginNick = useSelector(
    state => state.profile.myProfile[0].user.nickname,
  );
  const userNick = detail.nickname;
  const commentNick = itemData.nickname;
  //console.log('commentNick', commentNick);

  useEffect(() => {
    if (isFocused) {
      dispatch(__getPostDetailData());
    }
  }, [isFocused]);

  return (
    <View style={styles.commentsContainer}>
      <View style={styles.commentsTop}>
        <FastImage
          style={styles.profileImg}
          source={{
            uri: itemData.profileUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={'cover'}
        />
        <View style={styles.userInfo}>
          <Text style={styles.nicknameText}>{itemData.nickname}</Text>
          <Text style={styles.timeText}>{itemData.createdAt}</Text>
        </View>
        <View style={styles.btnControl}>
          {commentNick === loginNick ? (
            !edit ? (
              <Pressable style={styles.editBtn} onPress={onEditHandler}>
                <ServicesImg />
              </Pressable>
            ) : (
              <Pressable style={styles.editBtn} onPress={onDoneHandler}>
                <View style={styles.taskOn}>
                  <TaskImgOn />
                </View>
              </Pressable>
            )
          ) : (
            <View style={styles.editBtnEmpty}></View>
          )}
          {commentNick === loginNick ? (
            edit ? (
              <Pressable style={styles.deleteBtn} onPress={onEditCancelHandler}>
                <View style={styles.cancel}>
                  <ScanDelete />
                </View>
              </Pressable>
            ) : (
              <Pressable style={styles.deleteBtn} onPress={onDeleteHandler}>
                <Delete />
              </Pressable>
            )
          ) : (
            <></>
          )}
        </View>
      </View>
      <View style={styles.commentBox}>
        {!edit ? (
          <>
            <View style={styles.empty}></View>
            <View style={styles.textBox}>
              <Text style={styles.text}>{itemData.comment}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={styles.empty}></View>
            <View>
              <TextInput
                multiline
                maxLength={60}
                placeholder=" 댓글을 남겨주세요(60자 이하)"
                placeholderTextColor={BasicColors.grayColor}
                style={styles.inputBorder}
                onChangeText={onEditComment}>
                {itemData.comment}
              </TextInput>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Comments;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.9;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  // renderItem
  commentsTop: {
    flexDirection: 'row',
    paddingVertical: '2%',
    alignItems: 'center',
  },
  profileImg: {
    width: 24,
    height: 24,
    backgroundColor: BasicColors.grayColor,
    borderRadius: 100,
    marginRight: 10,
  },
  userInfo: {
    width: '74%',
  },
  nicknameText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 8,
  },
  btnControl: {
    flexDirection: 'row',
  },
  editBtn: {
    width: 24,
    height: 24,
    marginHorizontal: '5.6%',
  },
  taskOn: {
    left: 3,
  },
  editBtnEmpty: {
    width: 26,
    height: 24,
    marginHorizontal: '6%',
  },
  deleteBtn: {
    width: 24,
    height: 24,
    marginHorizontal: '4.8%',
  },
  cancel: {
    bottom: 2,
    right: 4,
  },
  commentBox: {
    width: windowWidth,
    flexDirection: 'row',
    alignContent: 'center',
  },
  textBox: {
    width: videoCardWidth * 0.93,
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: '2%',
    lineHeight: 12,
  },
  empty: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 14,
    color: '#262626',
  },
  inputBorder: {
    width: videoCardWidth * 0.94,
    right: 4,
    borderWidth: 1,
    borderColor: BasicColors.grayColor,
    borderRadius: 4,
    paddingHorizontal: '4%',
    lineHeight: 20,
    color: '#939393',
  },
});
