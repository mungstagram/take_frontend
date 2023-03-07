import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {Colors, BasicColors} from '../constants/colors';
import CommentInput from '../components/detailcomp/CommentInput';
import CommentList from '../components/detailcomp/CommentList';
import {__getPostDetailData} from '../redux/modules/commetsSlice';
import ImageDetailTop from '../components/detailcomp/ImageDetailTop';
import GoBackButtonWhite from '../components/common/GoBackButtonWhite';
import HeaderTitle from '../components/common/HeaderTitle';

const ImageDetail = ({route}) => {
  const detail = useSelector(state => state.comments.detail);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(__getPostDetailData(route.params.postId));
    }
  }, [isFocused, route]);

  return (
    <>
      <View style={styles.headerBox}>
        <View style={styles.goBackButton}>
          <GoBackButtonWhite />
        </View>
        <View style={styles.headerTitle}>
          <HeaderTitle />
          <Text style={styles.title}>사진 갤러리</Text>
        </View>
        <View style={styles.flex2}></View>
      </View>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={80}
        style={styles.avoid}>
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <View style={styles.contentBox}>
                <ImageDetailTop detail={detail} />
              </View>
              <View style={styles.commentInputBox}>
                <CommentInput detail={detail} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ImageDetail;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.9;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.mainColorDark,
  },
  headerBox: {
    position: 'absolute',
    width: windowWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    height: 58,
    backgroundColor: Colors.mainColorDark,
  },
  goBackButton: {
    height: 58,
    alignItems: 'flex-start',
    marginLeft: '7%',
    paddingTop: 18,
    zIndex: 20,
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    width: videoCardWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  title: {
    marginHorizontal: videoCardWidth * 0.05,
    fontSize: 28,
    color: BasicColors.whiteColor,
    fontFamily: 'SBAggro-M',
  },
  flex2: {
    flex: 1,
  },
  imageContainer: {
    top: '8%',
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
  },
  contentBox: {
    flex: 3,
  },
  commentListBox: {},
  commentInputBox: {
    flex: 1,
    top: 15,
    height: windowHeight,
    backgroundColor: BasicColors.whiteColor,
  },
});
