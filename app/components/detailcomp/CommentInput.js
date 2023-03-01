import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Colors, BasicColors} from '../../constants/colors';
import WriteComment from '../svg/WriteComment';
import {__postComment} from '../../redux/modules/commetsSlice';

const CommentInput = ({detail}) => {
  console.log('detail', detail);
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
    dispatch(__postComment({postId: detail.postid, comment: inputText}));
    setInputText('');
  };
  // 다른 유저가 입장할때마다 상태를 바꿔주기 위해 존재?
  const [myNick, setMyNick] = useState();

  useEffect(() => {
    const getNickName = async () => {
      setMyNick(await AsyncStorage.getItem('nickname'));
    };
    getNickName();
  }, [myNick]);
  console.log('myNick', myNick);

  return (
    <View style={styles.container}>
      <View style={styles.commentsInput}>
        <View style={styles.profileImg}></View>
        <TextInput
          value={inputText}
          onChangeText={commentTextEnter}
          style={styles.commentInput}></TextInput>
      </View>
      <TouchableOpacity
        style={styles.writeIcon}
        activeOpacity={0.8}
        hitSlop={{top: 32, bottom: 32, left: 32, right: 32}}
        onPress={commentEnterHandler}>
        <WriteComment />
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
    backgroundColor: BasicColors.whiteColor,
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
    right: '12%',
  },
  commentInput: {
    width: windowWidth * 0.74,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: BasicColors.grayColor,
  },
});
