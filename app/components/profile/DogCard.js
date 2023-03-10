import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, Alert, Pressable} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {useDispatch} from 'react-redux';

import Pets from '../svg/Pets';
import AddCircle from '../svg/AddCircle';
import ProfileInput from './components/ProfileInput';
import TaskPinkImg from '../svg/TaskPinkImg';
import TaskImg from '../svg/TaskImg';
import FastImage from 'react-native-fast-image';
import ProfileText from './components/ProfileText';
import ServicesImg from '../svg/ServicesImg';
import {
  __deleteDogProfile,
  __editDogProfile,
} from '../../redux/modules/profileSlice';
import Delete from '../svg/Delete';
import ScanDelete from '../svg/ScanDelete';
import MyText from '../common/MyText';
import {RadioButton} from 'react-native-paper';
const DogCard = ({dog, nickname, myNick}) => {
  //추가 버튼 상태
  const [editMode, setEditMode] = useState(false);
  const editMyDoghandler = () => {
    setEditMode(!editMode);
  };
  const unEditMyDoghandler = () => {
    Alert.alert(
      '',
      '작성을 취소하시겠습니까?',

      [
        {
          text: '취소하기',
          onPress: () => {
            setEditMode(!editMode);
            setInput({
              name: dog.name,
              introduce: dog.introduce,
              species: dog.species,
              weight: dog.weight,
              birthday: dog.birthday,
              bringDate: dog.bringDate,
            });
          },
        },
        {
          text: '계속작성',
        },
      ],
    );
  };

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
  //   console.log(images, 'images멀까?');

  const openAgainPicker = () => {
    setOpenCamera(true);
    openPicker();
  };

  const dispatch = useDispatch();
  // 폼데이터 선언 및 전송
  const formData = new FormData();

  const onSendFormData = () => {
    const isValidDate = dateString => {
      const date = new Date(dateString);
      // Date 객체가 유효한 날짜인지 확인합니다.
      return date instanceof Date && !isNaN(date);
    };
    const isNumber = value => {
      const num = Number(value);
      // 몸무게가 숫자인지 확인용
      if (num > 0) {
        return !isNaN(num);
      } else {
        return false;
      }
    };
    if (!isValidDate(birthday) || !isValidDate(bringDate)) {
      return Alert.alert('유효한 날짜를 입력해주세요', 'ex)2020-08-22');
    } else if (
      name === '' ||
      species === '' ||
      weight === '' ||
      introduce === ''
    ) {
      Alert.alert('입력하지 않은 내용이 있습니다.');
    } else if (!isNumber(weight)) {
      Alert.alert('몸무게는 양수여야 합니다.', 'ex) 8.5');
    } else {
      console.log(representative, '대표여부');
      formData.append('name', name);
      formData.append('species', species);
      formData.append('weight', weight);
      formData.append('introduce', introduce);
      formData.append('birthday', birthday);
      formData.append('bringDate', bringDate);
      formData.append('representative', representative);
      {
        images.length !== 0 &&
          formData.append('files', {
            name: images[0].fileName,
            type: images[0].mime,
            uri: `file://${images[0]?.realPath}`,
          });
      }

      dispatch(__editDogProfile({id: dog.id, formData}));

      setEditMode(false);
    }
  };
  //입력값
  const [input, setInput] = useState({
    name: '',
    introduce: '',
    species: '',
    weight: '',
    birthday: '',
    bringDate: '',
  });
  const {name, species, weight, introduce, birthday, bringDate} = input;
  //대표강아지 여부
  const [representative, setRepresentative] = useState(dog.representative);
  useEffect(() => {
    setInput({
      name: dog.name,
      introduce: dog.introduce,
      species: dog.species,
      weight: dog.weight,
      birthday: dog.birthday,
      bringDate: dog.bringDate,
    });
  }, [dog]);

  //인풋값 변경 함수
  const onChangeInputHandler = (name, value) => {
    setInput({...input, [name]: value});
  };
  const onDeleteDogCardHandler = () => {
    Alert.alert('', '삭제 하시겠습니까??', [
      {
        text: '취소하기',
      },
      {
        text: '삭제하기',
        onPress: () => {
          dispatch(__deleteDogProfile({id: dog.id}));
        },
      },
    ]);
  };

  return (
    <View style={styles.dogBlock}>
      <View style={dynamicStyles(editMode).addDogCard}>
        {editMode ? (
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
                    <FastImage
                      style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: 0.8,
                      }}
                      source={{
                        uri: dog.contentUrl,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
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
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Pets gray />
                  </View>
                </Pressable>
              )}
            </View>
            <View style={styles.addInfoContainer}>
              <View style={styles.inputAligner}>
                <ProfileInput
                  label={'강아지 이름'}
                  onUpdateValue={onChangeInputHandler.bind(this, 'name')}
                  value={name}
                  small
                />
                <View style={styles.addButtonWrapper}>
                  <MyText style={{fontSize: 12, width: '100%', lineHeight: 12}}>
                    대표 강아지
                  </MyText>
                  <View style={styles.addButtonAligner}>
                    <RadioButton
                      color="#F09090"
                      uncheckedColor="#C8C8C8"
                      value={representative}
                      status={representative ? 'checked' : 'unchecked'}
                      onPress={() => setRepresentative(!representative)}
                    />
                    <Pressable
                      style={{marginLeft: 16}}
                      onPress={unEditMyDoghandler}>
                      <ScanDelete brightGray />
                    </Pressable>
                    <Pressable
                      style={{marginLeft: 16}}
                      onPress={onSendFormData}>
                      <TaskPinkImg />
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.inputAligner}>
                <ProfileInput
                  label={'종류'}
                  value={species}
                  onUpdateValue={onChangeInputHandler.bind(this, 'species')}
                />
                <ProfileInput
                  label={'몸무게'}
                  onUpdateValue={onChangeInputHandler.bind(this, 'weight')}
                  value={String(weight)}
                  number
                  placeholder={'xx.x(kg)'}
                />
              </View>
              <View>
                <ProfileInput
                  label={'강아지 소개'}
                  long
                  onUpdateValue={onChangeInputHandler.bind(this, 'introduce')}
                  value={introduce}
                />
              </View>
              <View style={styles.inputAligner}>
                <ProfileInput
                  label={'태어난 날'}
                  placeholder={'0000-00-00'}
                  onUpdateValue={onChangeInputHandler.bind(this, 'birthday')}
                  value={birthday}
                />
                <ProfileInput
                  label={'데려온 날'}
                  placeholder={'0000-00-00'}
                  onUpdateValue={onChangeInputHandler.bind(this, 'bringDate')}
                  value={bringDate}
                  number
                />
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.addImageContainer}>
              <FastImage
                style={{height: '100%', width: '100%'}}
                source={{
                  uri: dog.contentUrl,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={styles.addInfoContainer}>
              <View style={styles.inputAligner}>
                <ProfileText title={'강아지 이름'} value={dog.name} />
                <View style={styles.addButtonWrapper}>
                  <View style={{height: 12, width: '100%'}} />
                  {nickname === myNick && (
                    <View style={styles.addButtonAligner}>
                      <Pressable onPress={onDeleteDogCardHandler}>
                        <Delete gray />
                      </Pressable>
                      <Pressable
                        style={{marginLeft: 16}}
                        onPress={editMyDoghandler}>
                        <ServicesImg gray />
                      </Pressable>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.inputAligner}>
                <ProfileText title={'종류'} value={dog.species} />
                <ProfileText title={'몸무게'} value={dog.weight} />
              </View>
              <View>
                <ProfileText title={'강아지 소개'} value={dog.introduce} long />
              </View>
              <View style={styles.inputAligner}>
                <ProfileText title={'태어난 날'} value={dog.birthday} />
                <ProfileText title={'데려온 날'} value={dog.bringDate} />
              </View>
            </View>
          </>
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
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2,
    },
  });

const styles = StyleSheet.create({
  dogBlock: {
    marginRight: 20,
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
  addButtonWrapper: {
    width: 116,
    // height: 62,
  },
  addButtonAligner: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 42,
    paddingRight: 8,
  },
  inputAligner: {
    flexDirection: 'row',
    width: 240,
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

export default DogCard;
