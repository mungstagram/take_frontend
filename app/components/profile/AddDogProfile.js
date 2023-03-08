import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Keyboard,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {useDispatch} from 'react-redux';

import Pets from '../svg/Pets';
import AddCircle from '../svg/AddCircle';
import ProfileInput from './components/ProfileInput';
import TaskPinkImg from '../svg/TaskPinkImg';
import TaskImg from '../svg/TaskImg';

const AddDogProfile = () => {
  //추가 버튼 상태
  const [addMode, setAddMode] = useState(false);
  const addMyDoghandler = () => {
    setAddMode(!addMode);
  };
  const unAddMyDoghandler = () => {
    Alert.alert(
      '',
      '작성을 취소하시겠습니까?',

      [
        {
          text: '취소하기',
          onPress: () => setAddMode(!addMode),
        },
        {
          text: '계속작성',
        },
      ],
    );
  };
  console.log(addMode);

  //카메라 기능 상용여부
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
      setImages(response);
    } catch (e) {
      // console.log(e.code, e.message);
    }
  };
  console.log(images, 'images멀까?');

  const openAgainPicker = () => {
    setOpenCamera(true);
    openPicker();
  };
  const renderItem = ({item, index}) => {
    return (
      <ScrollView style={styles.imageView}>
        <Image
          source={{
            uri:
              item?.type === 'video'
                ? 'file://' + (item?.crop?.cropPath ?? item.realPath)
                : 'file://' + (item?.crop?.cropPath ?? item.realPath),
          }}
          style={styles.media}
        />
      </ScrollView>
    );
  };

  const dispatch = useDispatch();
  // 폼데이터 선언 및 전송
  const formData = new FormData();
  const onSendFormData = () => {
    if (titleText === '') {
      return Alert.alert('제목을 넣어주세요');
    } else if (contentText === '') {
      return Alert.alert('내용을 넣어주세요');
    } else if (images.length === 0) {
      return Alert.alert('사진을 넣어주세요');
    } else {
      formData.append('category', 'image');
      formData.append('title', titleText);
      formData.append('content', contentText);
      formData.append('files', {
        name: images[0].fileName,
        type: images[0].mime,
        uri: `file://${images[0].realPath}`,
      });

      // dispatch(__postAddContentFormData(formData));
      // setTitleText('');
      // setContentText('');
      // setImages([]);
    }
  };

  return (
    <View style={styles.dogBlock}>
      <View style={dynamicStyles(addMode).addDogCard}>
        {addMode ? (
          <>
            <View style={styles.addImageContainer}>
              {openCamera ? (
                <Pressable
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  onPress={openPicker}>
                  {images.length === 0 ? (
                    <View
                      style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Pets gray />
                    </View>
                  ) : (
                    <Image
                      value={images}
                      resizeMode="contain"
                      style={{height: '100%', width: '100%'}}
                      source={{
                        uri: `file:// ${images[0]?.realPath}`,
                      }}
                    />
                  )}
                </Pressable>
              ) : (
                <Pressable
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  onPress={openAgainPicker}>
                  <Text>이미지</Text>
                </Pressable>
              )}
            </View>
            <View style={styles.addInfoContainer}>
              <View style={styles.inputAligner}>
                <ProfileInput label={'강아지 이름'} />
                <View style={styles.addButtonWrapper}>
                  <View style={{height: 12, width: '100%'}} />
                  <View style={styles.addButtonAligner}>
                    <Pressable onPress={unAddMyDoghandler}>
                      <TaskImg />
                    </Pressable>
                    {/* //TODO: 취소버튼으로 바꿔야함 */}
                    <Pressable onPress={addMyDoghandler}>
                      <TaskPinkImg />
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.inputAligner}>
                <ProfileInput label={'종류'} />
                <ProfileInput label={'몸무게'} />
              </View>
              <View>
                <ProfileInput label={'강아지 소개'} long />
              </View>
              <View style={styles.inputAligner}>
                <ProfileInput label={'태어난 날'} />
                <ProfileInput label={'데려온 날'} />
              </View>
            </View>
          </>
        ) : (
          <Pressable onPress={addMyDoghandler} style={styles.addDogCardText}>
            <View style={{marginBottom: 12}}>
              <AddCircle grayColor />
            </View>
            <Text style={styles.textStyle}>저희 집에</Text>
            <Text style={styles.textStyle}>댕댕이를 추가할게요!</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const dynamicStyles = value =>
  StyleSheet.create({
    addDogCard: {
      width: 284,
      height: 480,
      borderRadius: 15,
      backgroundColor: value ? 'transparent' : 'white',
      opacity: value ? 1 : 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
    },
  });

const styles = StyleSheet.create({
  dogBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  addDogCardText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
  },
  imageView: {},
  addButtonWrapper: {
    width: 108,
  },
  addButtonAligner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 36,
    paddingRight: 8,
  },
  inputAligner: {
    flexDirection: 'row',
    width: 226,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  addImageContainer: {
    position: 'absolute',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    top: 0,
    height: '35%',
    width: '100%',
    backgroundColor: '#F4F4F4',
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addInfoContainer: {
    position: 'absolute',
    bottom: 0,
    height: '69%',
    width: '99.9%',
    zIndex: 2,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    elevation: 2,
  },
});

export default AddDogProfile;
