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

const VideoGetter = ({order}) => {
  const videoContentList = useSelector(state => state.addContent.contentList);
  console.log('contentList22', videoContentList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getPostData({category: 'video', order}));
  }, [order]);

  return (
    <>
      <SafeAreaView>
        <FlatList
          data={videoContentList}
          renderItem={({item}) => (
            <View style={styles.container}>
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

const videoCardWidth = windowWidth - 40;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    marginBottom: videoCardHeight * 0.05,
  },
});
