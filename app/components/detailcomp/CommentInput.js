import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';

import {Colors, BasicColors} from '../../constants/colors';
import WriteComment from '../svg/WriteComment';
import {__postComment} from '../../redux/modules/commetsSlice';
import {__getProfile} from '../../redux/modules/profileSlice';
import WriteCommentOn from '../svg/WriteCommentOn';

const CommentInput = ({detail}) => {
  const dispatch = useDispatch();
  // 댓글 인풋창 상태
  const [inputText, setInputText] = useState('');
  // 댓글 인풋 set
  const commentTextEnter = e => {
    setInputText(e);
  };
  const commentEnterHandler = e => {
    e.preventDefault();
    if (inputText === '') return; // 아무것도 입력하지 않았을 때 dispatch 하지 않음
    dispatch(
      __postComment({postId: detail.postId, comment: inputText, target: 0}),
    );

    setInputText('');
  };

  // 유저 프로필 가져오기 아직 슬라이스가 안만들어져서 기다려야함
  // useEffect(() => {
  //   if (isFocused) {
  //     dispatch(__getProfile());
  //   }
  // }, [isFocused]);
  return (
    <View style={styles.container}>
      <View style={styles.commentsInput}>
        <View style={styles.profileImg}></View>
        <TextInput
          //numberOfLines={3}
          multiline
          maxLength={60}
          placeholder=" 댓글을 남겨주세요(60자 이하)"
          placeholderTextColor={BasicColors.grayColor}
          value={inputText}
          onChangeText={commentTextEnter}
          style={styles.commentInput}
          cursorColor="#FFC98B"></TextInput>
      </View>
      <TouchableOpacity
        style={styles.writeIcon}
        activeOpacity={0.8}
        hitSlop={{top: 32, bottom: 32, left: 32, right: 32}}
        onPress={commentEnterHandler}>
        {inputText ? <WriteCommentOn /> : <WriteComment />}
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.9;
//const videoCardHeight = videoCardWidth;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  commentsInput: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '4%',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: BasicColors.grayColor,
    marginRight: '4%',
  },
  writeIcon: {
    zIndex: 99,
    width: 24,
    height: 24,
    position: 'absolute',
    top: '35%',
    right: '8%',
  },
  commentInput: {
    width: windowWidth * 0.79,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: BasicColors.grayColor,
    paddingRight: 50,
  },
});
