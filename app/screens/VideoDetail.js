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
import GoBackButton from '../components/common/GoBackButton';
import {__getPostDetailData} from '../redux/modules/addContentSlice';
import VideoDetailTop from '../components/detailcomp/VideoDetailTop';
import CommentInput from '../components/detailcomp/CommentInput';
import CommentList from '../components/detailcomp/CommentList';

const VideoDetail = ({route}) => {
  //useSelector로.. postId 불러야할것 같음

  const detail = useSelector(state => state.addContent.detail);
  // 최초 마운트시 빈값이 들어오는 것에 대한 에러를 해결하기 위해
  // 에러나는 부분에서 빈값을 허용하도록 코드를 짠다. 나중에 state가 바뀌면서 제대로 된 값이 들어오기 때문에

  const videoUrl = detail.contentUrl[0];

  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  //postId를 보내준다. / 요청하고.
  useEffect(() => {
    if (isFocused) {
      dispatch(__getPostDetailData(route.params.postId));
    }
  }, [isFocused]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.goBackButton}>
          <GoBackButton />
        </View>
        <View style={styles.videoContainer}>
          <View style={styles.CommentBox}>
            <VideoDetailTop detail={detail} videoUrl={videoUrl} />
            <CommentList detail={detail} />
          </View>
        </View>
        <KeyboardAvoidingView>
          <View style={styles.videoComment}>
            <CommentInput detail={detail} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
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
  goBackButton: {
    position: 'absolute',
    height: '7.48%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '7%',
  },
  videoContainer: {
    position: 'absolute',
    top: '8%',
    width: ' 100%',
    height: '100%',
    alignItems: 'center',
  },
  CommentBox: {
    position: 'relative',
  },
  videoComment: {
    height: windowHeight,
    zIndex: 99,
    position: 'relative',
    bottom: '6%',
    justifyContent: 'flex-end',
  },
});
