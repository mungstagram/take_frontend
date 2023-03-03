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
import CommentInput from '../components/detailcomp/CommentInput';
import CommentList from '../components/detailcomp/CommentList';
import {__getPostDetailData} from '../redux/modules/addContentSlice';
import ImageDetailTop from '../components/detailcomp/ImageDetailTop';

const ImageDetail = ({route}) => {
  const detail = useSelector(state => state.addContent.detail);

  //   const imageUrl = detail.contentUrl.map((item, index) => {
  //     console.log('detail', item, index);
  //   });

  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  //postId를 보내준다. / 내일 수홍님한테 렌더링 두번 되는 거에 대해 물어보기.
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
        <View style={styles.imageContainer}>
          <View style={styles.CommentBox}>
            <ImageDetailTop detail={detail} />
            <CommentList detail={detail} />
          </View>
        </View>

        <KeyboardAvoidingView>
          <View style={styles.imageComment}>
            <CommentInput detail={detail} />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
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
  goBackButton: {
    position: 'absolute',
    height: '7.48%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '7%',
  },
  imageContainer: {
    position: 'absolute',
    top: '8%',
    width: ' 100%',
    height: '100%',
    alignItems: 'center',
  },
  CommentBox: {
    position: 'relative',
  },
  imageComment: {
    height: windowHeight,
    zIndex: 99,
    position: 'relative',
    bottom: '6%',
    justifyContent: 'flex-end',
  },
});
