import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import {Colors, BasicColors} from '../../constants/colors';
import WriteComment from '../svg/WriteComment';
import {__postComment} from '../../redux/modules/commetsSlice';
import {__getHomeProfile} from '../../redux/modules/profileSlice';
import WriteCommentOn from '../svg/WriteCommentOn';
import {__getProfile} from '../../redux/modules/profileSlice';
import MyText from '../common/MyText';

const CommentInput = ({detail}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const userImg = useSelector(state => state.profile.myProfile[0].user);
  //console.log('mp', userImg);
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

  useEffect(() => {
    if (isFocused) {
      dispatch(__getHomeProfile());
    }
  }, [isFocused]);
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.commentsInput}>
          <View style={styles.profileImg}>
            <FastImage
              style={styles.profileImg}
              source={{
                uri: userImg.contentUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={'cover'}
            />
          </View>
          <TextInput
            numberOfLines={2}
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
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          onPress={commentEnterHandler}>
          {inputText ? <WriteCommentOn /> : <WriteComment />}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    color: '#262626',
  },
});
