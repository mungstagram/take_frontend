import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

import {Colors, BasicColors} from '../../constants/colors';
import Favorite from '../svg/Favorite';
import NotFavorite from '../svg/NotFavorite';
import GoBackButton from '../common/GoBackButton';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const ImageDetailTop = ({detail}) => {
  const imageList = detail.contentUrl;
  // const images = imageList.map(item => item);

  // console.log('images', images);

  // const renderItem = () => {
  //   const images = imageList.map(item => item);
  //   return <FastImage source={{uri: images}} />;
  // };
  // const renderItem = ({item, index}) => {
  //   return (
  //     <ScrollView style={styles.imageView}>
  //       <Image
  //         width={IMAGE_WIDTH}
  //         source={{
  //           uri: imageList[item],
  //         }}
  //         style={styles.media}
  //       />
  //     </ScrollView>
  //   );
  // };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View></View>
        <View style={styles.detailTop}>
          <FastImage
            style={styles.profileImg}
            source={{
              uri: detail.profileUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={'cover'}
          />
          <View>
            <Text style={styles.nicknameText}>{detail.nickname}</Text>
            <Text style={styles.timeText}>{detail.createdAt}</Text>
          </View>
        </View>
        {/* <FlatList
          data={images}
          keyExtractor={(item, index) => (item?.filename ?? item?.path) + index}
          renderItem={renderItem}
          horizontal={true}
        /> */}

        <View style={styles.detailBottom}>
          <View style={styles.preContent}>
            <Text>{detail.title}</Text>
            <View style={styles.favoritBox}>
              <NotFavorite />
              <Text>{detail.likesCount}</Text>
            </View>
          </View>
          <View style={styles.contentBox}>
            <Text>{detail.content}</Text>
            {/* <Text>더보기</Text> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ImageDetailTop;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    width: videoCardWidth,
    backgroundColor: BasicColors.whiteColor,
  },
  detailTop: {
    backgroundColor: BasicColors.whiteColor,
    flexDirection: 'row',
    padding: '2%',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  profileImg: {
    width: 24,
    height: 24,
    backgroundColor: BasicColors.grayColor,
    borderRadius: 100,
    marginRight: 10,
  },
  nicknameText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 8,
  },
  imageScreen: {
    width: videoCardWidth,
    height: videoCardHeight * 0.703,
    backgroundColor: BasicColors.blackColor,
  },
  detailBottom: {
    backgroundColor: BasicColors.whiteColor,
    height: videoCardHeight * 0.3,
    padding: '2%',
  },
  preContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60%',
  },
  favoritBox: {
    alignItems: 'center',
  },
  contentBox: {
    flexDirection: 'row',
  },
});
