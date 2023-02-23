import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

import {Colors, BasicColors} from '../../constants/colors';
import VideoCard from './VideoCard';

const VideoGetter = () => {
  return (
    <>
      <View style={styles.container}>
        <VideoCard />
      </View>
    </>
  );
};

export default VideoGetter;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth - 40;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({});
