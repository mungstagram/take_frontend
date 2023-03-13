import {StyleSheet, View, Modal, Pressable, Dimensions} from 'react-native';
import React, {useState} from 'react';

import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {enterModal} from '../../redux/modules/commetsSlice';

const AddModal = ({modalImage}) => {
  const dispatch = useDispatch();

  const onCloseBtn = () => {
    dispatch(enterModal({imgUrl: '', state: false}));
  };

  return (
    <View>
      <Modal animationType="fade" style={styles.container} transparent={true}>
        <View style={styles.modalBack}>
          <Pressable
            onPress={() => {
              onCloseBtn();
            }}>
            <FastImage
              style={styles.zoomImg}
              source={{
                uri: modalImage.imgUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={'contain'}
            />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default AddModal;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  //모달 화면
  modalBack: {
    flex: 1,
    backgroundColor: '#000000d5',
  },
  zoomImg: {
    width: '100%',
    minwidth: '100%',
    minHeight: '100%',
  },
});
