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
import MyText from '../common/MyText';

const VideoGetter = ({order, nickname, searchData}) => {
  const videoContentList = useSelector(state => state.addContent.contentList);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && !searchData) {
      nickname
        ? dispatch(__getPostData({category: 'video', order, nickname}))
        : dispatch(__getPostData({category: 'video', order}));
    }
  }, [order, isFocused]);

  return (
    <View style={styles.getterWrapper}>
      <SafeAreaView>
        {searchData ? (
          <FlatList
            data={searchData}
            renderItem={({item}) => (
              <View>
                <VideoCard videoContent={item} title={item.title} />
              </View>
            )}
            keyExtractor={item => item.postId}
            horizontal={false}
          />
        ) : (
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
        )}
      </SafeAreaView>
    </View>
  );
};

export default VideoGetter;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.9;

const styles = StyleSheet.create({
  getterWrapper: {
    height: '100%',
    width: '95%',
    left: '1.6%',
    justifyContent: 'center',
    marginBottom: 24,
  },
  container: {},
});
