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
import {__getPostDetailData} from '../redux/modules/commetsSlice';
import ImageDetailTop from '../components/detailcomp/ImageDetailTop';

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
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <View style={styles.goBackButton}>
            <GoBackButton />
          </View>
          <View style={styles.imageContainer}>
            <View style={styles.contentBox}>
              <ImageDetailTop detail={detail} />
            </View>
            <View style={styles.commentInputBox}>
              <CommentInput detail={detail} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    zIndex: 20,
  },
  imageContainer: {
    position: 'absolute',
    top: '8%',
    width: ' 100%',
    height: '100%',
    alignItems: 'center',
  },
  contentBox: {
    flex: 9,
  },
  commentListBox: {
    // flex: 4.3,
    // zIndex: 5,
  },
  commentInputBox: {
    flex: 1,
    height: windowHeight,
    bottom: '8%',
    justifyContent: 'flex-end',
  },
});
