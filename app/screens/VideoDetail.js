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
import GoBackButtonWhite from '../components/common/GoBackButtonWhite';
import {__getPostDetailData} from '../redux/modules/commetsSlice';
import VideoDetailTop from '../components/detailcomp/VideoDetailTop';
import CommentInput from '../components/detailcomp/CommentInput';
import HeaderTitle from '../components/common/HeaderTitle';

const VideoDetail = ({route}) => {
  //useSelector로.. postId 불러야할것 같음

  const detail = useSelector(state => state.comments.detail);

  const videoUrl = detail.contentUrl[0];
  // 최초 마운트시 빈값이 들어오는 것에 대한 에러를 해결하기 위해
  // 에러나는 부분에서 빈값을 허용하도록 코드를 짠다. 나중에 state가 바뀌면서 제대로 된 값이 들어오기 때문에

  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  //postId를 보내준다. / 요청하고.
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
          <Text style={styles.title}>동영상 갤러리</Text>
        </View>
        <View style={styles.flex2}></View>
      </View>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={80}
        style={styles.avoid}>
        <View style={styles.container}>
          <View style={styles.videoContainer}>
            <View style={styles.contentBox}>
              <VideoDetailTop detail={detail} videoUrl={videoUrl} />
            </View>
            <View style={styles.commentInputBox}>
              <CommentInput detail={detail} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default VideoDetail;

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
  videoContainer: {
    top: '8%',
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
  },
  contentBox: {
    flex: 3,
  },
  commentInputBox: {
    flex: 1,
    top: 15,
    height: windowHeight,
    backgroundColor: BasicColors.whiteColor,
  },
  avoid: {},
});
