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
import {useDispatch, useSelector} from 'react-redux';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import FastImage from 'react-native-fast-image';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import {__getProfile, __editProfile} from '../../redux/modules/profileSlice';

import Emoticon from '../svg/Emoticon';

const PersonProfileCard = ({item}) => {
  // const PersonProfileCard = ({myInfo}) => {
  //   console.log('user myNick', myInfo[0].user);
  const dispatch = useDispatch();
  // console.log('item', item);

  //카메라
  const [openCamera, setOpenCamera] = useState(false);

  //data 불러옴
  const profile = useSelector(state => state.profile.profile);
  // console.log('input profile', profile[0]);

  //input
  const [profNickEdit, setProfNickEdit] = useState(profile[0]?.user.nickname);
  const [profIntroEdit, setProfIntroEdit] = useState(
    profile[0]?.user.introduce,
  );

  //수정
  const [isEdit, setIsEdit] = useState(false);

  //이미지
  const [images, setImages] = useState([]);

  //data 값 get
  useEffect(() => {
    // console.log('data를 가져오자');
    //2.데이터 값을 초기에 실행(마운트될때, 안에 있는 함수을 실행)
    dispatch(__getProfile());
    //3. dispatch get 프로필 정보 요청
    // console.log('2.2.user', nickname);
    // console.log('person profile');
  }, []);

  // console.log('state.profile', profile[0]);
  // console.log('user dog', myInfo[1].dogs);
  // console.log('contentUrl', myInfo[0].user.contentUrl);

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
  // console.log('input profile profIntroEdit', profIntroEdit);

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
        console.warn(error);
      }
    };
    requestCameraPermission();
  }, []);

  //input 수정 폼 데이터

  const sendEditFormData = () => {
    const formData = new FormData();
    // console.log('images[0]', images[0]);

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

    // console.log('edit profile');
    // console.log('formData', formData);

    dispatch(
      __editProfile({nickname: profile[0]?.user.nickname, formData: formData}),
    );
    if (error === null) setIsEdit(false);
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
      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
    }
  };
  // console.log(images);

  return (
    <View style={styles.block}>
      <View style={styles.card}>
        <View style={styles.cardLeftWrap}>
          <View style={styles.imgOpenBtn}>
            {isEdit ? (
              <View>
                <TouchableOpacity
                  style={styles.personProfileImg}
                  onPress={openPicker}
                  vlue={openCamera}>
                  {images.length !== 0 ? (
                    <Image
                      value={images}
                      width={IMAGE_WIDTH}
                      style={styles.media}
                      source={{
                        uri: `file:// ${images[0]?.realPath}`,
                      }}
                    />
                  ) : (
                    <Emoticon />
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <FastImage
                style={styles.personImg}
                source={{
                  uri: profile[0]?.user.contentUrl,
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
            {profile[0]?.user.dogsCount} 마리의 집사
          </Text>
        </View>

        <View style={styles.cardRightWrap}>
          <View style={styles.textInputWrap}>
            <View>
              {isEdit ? (
                <TextInput
                  style={{left: 10}}
                  placeholder="Nick Name"
                  onChangeText={onPresschangeNickEdit}
                  value={profNickEdit}
                  autoFocus
                />
              ) : (
                <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
                  {profile[0].user.nickname}
                </Text>
              )}
            </View>

            {isEdit ? (
              <TouchableOpacity
                style={styles.editBtn}
                onPress={sendEditFormData}>
                <Text>저장</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.editBtn}
                onPress={onPressInputEdit}>
                <Text>수정</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            {isEdit ? (
              <TextInput
                placeholder="성격, 산책 시간, 거주지 소개"
                maxLength={25}
                style={styles.textInputIntro}
                multiline={true}
                value={profIntroEdit}
                onChangeText={onPresschangeProfEdit}
              />
            ) : (
              <Text style={{fontSize: 16, color: 'white'}}>
                {profile[0].user.introduce}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const IMAGE_WIDTH = 80;

const styles = StyleSheet.create({
  block: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    // borderWidth: 5,
    // borderColor: 'red',
    width: 320,
    height: 132,
    flexDirection: 'row',
  },
  cardLeftWrap: {
    // borderWidth: 3,
    // borderColor: 'blue',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRightWrap: {
    // borderWidth: 3,
    // borderColor: 'green',
    width: 190,
    left: '16%',
    padding: '4%',
  },
  editBtn: {
    borderWidth: 1,
    // width: 24,
    width: 30,
    height: 24,
    zIndex: 1,
  },

  textInputWrap: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textInputBtn: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    left: '55%',
    top: '12%',
    position: 'absolute',
  },
  personImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    top: '10%',
    left: '15%',
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  media: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    backgroundColor: 'rgba(155, 155, 155, 0.2)',
  },
  imgOpenBtn: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    right: '10%',
  },
  personProfileImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PersonProfileCard;
