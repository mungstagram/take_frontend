import React, {useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Colors, BasicColors} from '../../constants/colors';
import VideoCard from './VideoCard';
import {__getPostData} from '../../redux/modules/addContentSlice';
import {startDetecting} from 'react-native/Libraries/Utilities/PixelRatio';
import {useIsFocused} from '@react-navigation/native';

const VideoGetter = ({order}) => {
  const videoContentList = useSelector(state => state.addContent.contentList);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(__getPostData({category: 'video', order}));
    }
  }, [order, isFocused]);

  return (
    <>
      <SafeAreaView>
        <FlatList
          data={videoContentList}
          renderItem={({item}) => (
            <View>
              <VideoCard videoContent={item} title={item.title} />
            </View>
          )}
          keyExtractor={item => item.postId}
          horizontal={false}
        />
      </SafeAreaView>
    </>
  );
};

export default VideoGetter;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.9;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    width: videoCardWidth,
  },
});
