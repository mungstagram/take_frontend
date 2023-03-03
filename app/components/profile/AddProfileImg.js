import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import {__addProfileImgFormData} from '../../redux/modules/profileImgSlice';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

const AddProfileImg = ({item, index}) => {
  const dispatch = useDispatch();
  const [openCamera, setOpenCamera] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') return;
    const platformPermissions =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    const requestCameraPermission = async () => {
      try {
        const result = await request(platformPermissions);
        result === RESULTS.GRANTED
          ? setOpenCamera(true)
          : Alert.alert('카메라 권한을 허용해주세요!');
      } catch (error) {
        Alert.alert('카메라 권한설정이 에러났습니다.');
        console.warn(error);
      }
    };
    requestCameraPermission();
  }, []);
  // * 사진관련 코드
  const [images, setImages] = useState([]);

  // 사진넣기 버튼 클릭시 작동하는 이벤트
  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        usedCameraButton: true,
        mediaType: 'image',
        maxSelectedAssets: 1,
        selectedAssets: images,
        isExportThumbnail: true,
        isCrop: true,
        isCropCircle: true,
      });
      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };

  // 폼데이터 선언 및 전송
  const formData = new FormData();

  const onSendFormData = () => {
    formData.append('image', {
      uri: uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    dispatch(__addProfileImgFormData(formData));
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.personProfileImg}
        onPress={openPicker}
        vlue={openCamera}
      />

      <Image
        width={IMAGE_WIDTH}
        style={styles.media}
        // source={uri: 'file://' + (item?.crop?.cropPath ?? item.realPath)}
      />

      <TouchableOpacity onPress={onSendFormData}>
        <Text>저장이미지</Text>
      </TouchableOpacity>
    </View>
  );
};

const IMAGE_WIDTH = 50;

const styles = StyleSheet.create({
  openImg: {
    borderWidth: 1,
    width: 50,
    height: 20,
  },

  personProfileImg: {
    // width: 80,
    // height: 80,
    // borderRadius: 50,
    borderWidth: 1,
    width: 50,
    height: 30,
    backgroundColor: 'red',

    // backgroundColor: '#eeeeee',
    // alignItems: 'center',
    // justifyContent: 'center',
    // position: 'absolute',
  },
  media: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    backgroundColor: 'rgba(155, 155, 155, 0.2)',
  },
});

export default AddProfileImg;
