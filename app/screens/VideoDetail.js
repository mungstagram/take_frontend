import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {Colors, BasicColors} from '../constants/colors';
import GoBackButton from '../components/common/GoBackButton';
import VideoDetailTop from '../components/detailcomp/VideoDetailTop';
import DetailComments from '../components/detailcomp/DetailComments';
import {__getPostDetailData} from '../redux/modules/addContentSlice';

const VideoDetail = ({route}) => {
  //useSelector로.. postId 불러야할것 같음
  const detail = useSelector(state => state.addContent.detail);

  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  //postId를 보내준다.
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
          <VideoDetailTop detail={detail} />
        </View>
        <View>
          <DetailComments />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoDetail;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
});
