import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import FastImage from 'react-native-fast-image';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import {__getProfile, __editProfile} from '../../redux/modules/profileSlice';
import Emoticon from '../svg/Emoticon';
import ServicesWhiteImg from '../svg/ServicesWhiteImg';
import TaskImgWhite from '../svg/TaskImgWhite';

const PersonProfileCard = ({myInfo}) => {
  console.log(myInfo, '프룹스받은값');
  const dispatch = useDispatch();

  //카메라
  const [openCamera, setOpenCamera] = useState(false);

  //input
  const [profNickEdit, setProfNickEdit] = useState(myInfo?.nickname);
  const [profIntroEdit, setProfIntroEdit] = useState(myInfo?.introduce);

  //수정
  const [isEdit, setIsEdit] = useState(false);

  //이미지
  const [images, setImages] = useState([]);

  //수정버튼 클릭 이벤트
  const onPressInputEdit = () => {
    setIsEdit(true);
  };

  //input 닉네임,자기소개 수정
  const onPresschangeNickEdit = e => {
    setProfNickEdit(e);
  };
  // console.log('input profile profNickEdit', profNickEdit);

  const onPresschangeProfEdit = e => {
    setProfIntroEdit(e);
  };

  //이미지,권한 설정
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
        // console.warn(error);
      }
    };
    requestCameraPermission();
  }, []);

  //input 수정 폼 데이터

  const sendEditFormData = () => {
    const formData = new FormData();

    formData.append('changeNickname', profNickEdit);
    formData.append('introduce', profIntroEdit);
    {
      images.length !== 0 &&
        formData.append('files', {
          name: images[0].fileName,
          type: images[0].mime,
          uri: `file://${images[0]?.realPath}`,
        });
    }

    console.log('edit profile');
    console.log('formData', formData);

    dispatch(__editProfile({nickname: myInfo?.nickname, formData: formData}));
    setIsEdit(false);
  };

  //이미지 클릭시 갤러리를 여는 이벤트
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
      // console.log('response: ', response);
      setImages(response);
    } catch (e) {
      // console.log(e);
      Alert.alert('사진 등록 버튼에 오류가 생겼습니다. 문의부탁드립니다.');
    }
  };
  // console.log(images, '이미지 저장되었는가?');

  return (
    <View style={styles.block}>
      <View style={styles.card}>
        <View style={styles.cardLeftWrap}>
          <View style={styles.imgOpenBtn}>
            {isEdit ? (
              <View>
                <TouchableOpacity onPress={openPicker} value={openCamera}>
                  {images.length !== 0 ? (
                    <Image
                      value={images}
                      style={styles.media}
                      source={{
                        uri: `file:// ${images[0]?.realPath}`,
                      }}
                    />
                  ) : (
                    <FastImage
                      style={styles.personProfileImg}
                      source={{
                        uri: myInfo.contentUrl,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <FastImage
                style={styles.media}
                source={{
                  uri: myInfo?.contentUrl,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
          </View>

          <Text
            style={{
              fontSize: 12,
              color: 'white',
              zIndex: 2,
              marginTop: '12%',
            }}>
            {myInfo?.dogsCount} 마리의 집사
          </Text>
        </View>

        <View style={styles.cardRightWrap}>
          {isEdit ? (
            <TouchableOpacity onPress={sendEditFormData} style={styles.saveBtn}>
              <TaskImgWhite />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPressInputEdit} style={styles.editBtn}>
              <ServicesWhiteImg />
            </TouchableOpacity>
          )}
          <View style={styles.textInputWrap}>
            {isEdit ? (
              <>
                <TextInput
                  placeholder="Nick Name"
                  onChangeText={onPresschangeNickEdit}
                  value={profNickEdit}
                  style={styles.textNickInput}
                  autoFocus
                />
                <TextInput
                  placeholder="성격, 산책 시간, 거주지 소개"
                  maxLength={25}
                  multiline={true}
                  value={profIntroEdit}
                  onChangeText={onPresschangeProfEdit}
                  style={styles.textIntroInput}
                />
              </>
            ) : (
              <>
                <Text style={styles.textNick}>{myInfo?.nickname}</Text>
                <Text style={styles.textIntro}>{myInfo?.introduce}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    // borderWidth: 1,
    width: 320,
    height: 132,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLeftWrap: {
    width: 94,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRightWrap: {
    // borderWidth: 1,
    width: 226,
  },

  textInputWrap: {
    // borderWidth: 1,
    width: '100%',
    height: '100%',
    bottom: '10%',
  },

  textNick: {
    // borderWidth: 1,
    width: 170,
    height: 56,
    position: 'absolute',
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    paddingLeft: 10,
    paddingTop: 10,
  },
  textNickInput: {
    width: 170,
    height: 56,
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 1,
    opacity: 0.5,
    padding: 16,
  },
  saveBtn: {
    // borderWidth: 1,
    width: 24,
    height: 24,
    zIndex: 1,
    left: '80%',
    top: '25%',
  },

  editBtn: {
    // borderWidth: 1,
    width: 24,
    height: 24,
    zIndex: 1,
    position: 'relative',
    left: '80%',
    top: '25%',
  },

  textIntro: {
    // borderWidth: 1,
    width: 222,
    height: 72,
    position: 'relative',
    top: '44%',
    fontSize: 16,
    color: 'white',
    marginTop: '4%',
    paddingLeft: 10,
    paddingTop: 10,
  },
  textIntroInput: {
    width: 222,
    height: 72,
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    opacity: 0.5,
    padding: 16,
    fontSize: 16,
    marginTop: '2%',
    borderWidth: 1,
  },

  textInputBtn: {
    // borderWidth: 1,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    left: '55%',
    top: '12%',
    position: 'absolute',
  },
  personImg: {
    // borderWidth: 1,
    width: 80,
    height: 80,
    borderRadius: 50,
    top: '10%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  media: {
    // borderWidth: 1,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#ffffff',
  },
  imgOpenBtn: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personProfileImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    borderWidth: 1,
    top: '10%',
    borderColor: '#ffffff',
  },
});

export default PersonProfileCard;
