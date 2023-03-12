import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import FastImage from 'react-native-fast-image';
import MyText from '../common/MyText';
import {Colors, BasicColors} from '../../constants/colors';
import {enterModal} from '../../redux/modules/commetsSlice';

const SlideImg = ({item}) => {
  const dispatch = useDispatch();
  //모달상태
  const [visable, setVisable] = useState(false);
  //모달
  const onZoomIn = () => {
    dispatch(enterModal({imgUrl: item, state: true}));
  };

  return (
    <View>
      <ScrollView style={styles.imageView}>
        <Image
          source={{
            uri: item,
          }}
          style={styles.imageScreen}
          resizeMode="contain"
        />
        <Pressable
          onPress={() => onZoomIn(item)}
          activeOpacity={0.9}
          style={styles.zoomBtnBox}>
          <Image
            source={require('../../assets/zoomIn.png')}
            resizeMode={'cover'}
            style={styles.zoomBtn}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default SlideImg;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageCardWidth = windowWidth;
const imageCardHeight = imageCardWidth * 0.8;

const styles = StyleSheet.create({
  imageView: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    position: 'relative',
  },
  imageScreen: {
    width: imageCardWidth,
    height: imageCardHeight * 0.703,
    backgroundColor: BasicColors.blackColor,
  },
  zoomBtnBox: {
    position: 'absolute',
    right: '4%',
    top: '4%',
    zIndex: 999,
  },
  zoomBtn: {
    height: 32,
    width: 32,
  },
});
