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

import FastImage from 'react-native-fast-image';
import MyText from '../common/MyText';
import {Colors, BasicColors} from '../../constants/colors';

const AddModal = ({item}) => {
  //모달상태
  const [visable, setVisable] = useState(false);
  console.log('상태', visable);
  //모달
  const onZoomIn = () => {
    console.log('모달');
    setVisable(!visable);
  };

  return (
    <View>
      <ScrollView style={styles.imageView}>
        {visable ? (
          <>
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
          </>
        ) : (
          <>
            <View style={styles.allBox}>
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
            </View>
            <View style={styles.modalPosition}>
              <Modal
                animationType="fade"
                style={styles.container}
                transparent={true}>
                <View>
                  <FastImage
                    style={styles.zoomImg}
                    source={{
                      uri: item,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={'contain'}>
                    <Pressable
                      onPress={() => {
                        setVisable(!visable);
                      }}
                      style={styles.modalButton}>
                      <MyText style={styles.modalCancel}>X</MyText>
                    </Pressable>
                  </FastImage>
                </View>
              </Modal>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AddModal;

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
  //모달 화면
  zoomImg: {
    aspectRatio: 1,
    //backgroundColor: 'black',
  },
  modalButton: {
    width: 22,
    height: 22,
    backgroundColor: '#d6d6d6',
    borderRadius: 4,
    position: 'absolute',
    right: '2%',
    top: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCancel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: BasicColors.blackColor,
  },
});
