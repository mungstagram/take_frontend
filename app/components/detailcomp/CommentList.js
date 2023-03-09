import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {Colors, BasicColors} from '../../constants/colors';
import CommentImg from '../svg/CommentImg';
import ServicesImg from '../svg/ServicesImg';
import Delete from '../svg/Delete';
import {__deleteComment, __putComment} from '../../redux/modules/commetsSlice';
import {__getPostDetailData} from '../../redux/modules/commetsSlice';
import {__putLikes} from '../../redux/modules/addContentSlice';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';

import Comments from './Comments';

const CommentList = ({userNick}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  //댓글 리스트
  const commentList = useSelector(state => state.comments.comments);
  //console.log('list', commentList);
  const detail = useSelector(state => state.comments.detail);
  //console.log('de', detail);
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

  //FlatList Header
  const detailContent = () => {
    return (
      <View>
        <View style={styles.detailBottom}>
          <View style={styles.preContent}>
            <Text style={styles.titleText}>{detail.title}</Text>
            <View style={styles.favoritBox}>
              <Pressable onPress={onIsLikeHandler}>
                {detail.isLiked ? <Favorite big /> : <NotFavorite big />}
              </Pressable>
              <Text>{detail.likesCount}</Text>
            </View>
          </View>
          <View style={styles.contentText}>
            <Text numberOfLines={line} ellipsizeMode="tail">
              {detail.content}
            </Text>
          </View>
        </View>
        <View style={styles.commentCountBox}>
          <View style={styles.commentIcon}>
            <CommentImg />
          </View>
          <Text>{commentList.length}</Text>
        </View>
      </View>
    );
  };

  //FlatList Footer
  const FooterContainer = () => {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>마지막 댓글입니다.</Text>
      </View>
    );
  };
  //FlatList Render
  const renderItem = item => {
    return <Comments userNick={userNick} item={item} detail={detail} />;
  };

  return (
    <>
      {isActivated ? (
        //상세보기
        <View style={styles.listBoxLong}>
          <FlatList
            ListHeaderComponent={detailContent}
            data={commentList}
            extraData={commentList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.listinBox2}
            horizontal={false}
            nestedScrollEnabled={true}
            ListFooterComponent={FooterContainer}
          />
        </View>
      ) : (
        //간략보기
        <View style={styles.listBoxShort}>
          <View style={styles.preContent}>
            <Text style={styles.titleText}>{detail.title}</Text>
            <View style={styles.favoritBox}>
              <Pressable onPress={onIsLikeHandler}>
                {detail.isLiked ? <Favorite big /> : <NotFavorite big />}
              </Pressable>
              <Text>{detail.likesCount}</Text>
            </View>
          </View>
          <View style={styles.contentText}>
            <Text numberOfLines={line} ellipsizeMode="tail">
              {detail.content}
            </Text>
            <Pressable onPress={prev => handleLine(!prev[0], prev[1])}>
              <Text>더보기</Text>
            </Pressable>
          </View>
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
                extraData={commentList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.listinBox}
                horizontal={false}
                nestedScrollEnabled={true}
                ListFooterComponent={FooterContainer}
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
  container: {},
  listBoxLong: {
    height: windowHeight * 0.44,
    padding: '4%',
  },
  listBoxShort: {
    height: windowHeight * 0.44,
    padding: '4%',
  },
  // 제목, 내용 스타일
  detailBottom: {},
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
  commentsContainer: {
    //backgroundColor: 'red',
  },
  commentCountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    marginVertical: '2%',
  },
  commentIcon: {
    marginRight: '1%',
    marginTop: '3%',
  },
  //flatList
  listBox: {
    width: windowWidth * 0.94,
  },
  listinBox: {
    height: videoCardHeight * 0.76,
  },
  listinBox2: {
    height: videoCardHeight * 0.86,
  },
  footerContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  footer: {
    color: 'rgba(209, 103, 41, 0.6)',
    fontSize: 8,
  },
});
