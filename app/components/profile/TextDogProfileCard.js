import React, {useEffect, useState, useRef} from 'react';
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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import {
  __addDogProfile,
  __addDogImg,
} from '../../redux/modules/dogProfileSlice';
import {__getProfile, __editDogProfile} from '../../redux/modules/profileSlice';

import Pets from '../../components/svg/Pets';
import TaskPinkImg from '../../components/svg/TaskPinkImg';
import ServicesPinkImg from '../../components/svg/ServicesPinkImg';

import FastImage from 'react-native-fast-image';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

const InputDogProfileCard = ({item, index}) => {
  const dispatch = useDispatch();

  //Profile Data 가져오기
  const profile = useSelector(state => state.profile.profile);
  console.log('dog profile', profile[1]);

  //카메라
  const [openCamera, setOpenCamera] = useState(false);

  //이미지
  const [images, setImages] = useState([]);

  //data 값을 get
  useEffect(() => {
    console.log('강아지 data를 가져오자');
    dispatch(__getProfile());
  }, []);

  //ainput에서 text 로 바뀜
  const [isEdit, setIsEdit] = useState(true);

  //Add Input
  const inputRef = useRef();

  const [input, setInput] = useState({
    name: '',
    introduce: '',
    species: '',
    weight: '',
    birthday: '',
    bringDate: '',
  });

  const {name, introduce, species, weight, birthday, bringDate} = input;

  console.log('input', input);
  const onChange = (keyvalue, e) => {
    const {text} = e.nativeEvent;
    setInput({
      ...input,
      [keyvalue]: text,
    });
  };

  //수정과 저장 버튼
  const onPressEdit = () => {
    setIsEdit(!isEdit);
  };

  //Add dog profile
  const onPressAdd = e => {
    console.log('onPressAdd 안에', inputRef.current);
    dispatch(
      __addDogProfile({
        name: inputRef.current,
        introduce: inputRef.current,
        species: inputRef.current,
        weight: inputRef.current,
        birthday: inputRef.current,
        bringDate: inputRef.current,
      }),
    );
  };

  // useEffect(() => {}, []);

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
    console.log('images[0]', images[0]);

    formData.append('name', name);
    formData.append('species', species);
    formData.append('weight', weight);
    formData.append('introduce', introduce);
    formData.append('birthday', birthday);
    formData.append('bringDate', bringDate);
    {
      images.length !== 0 &&
        formData.append('files', {
          name: images[0].fileName,
          type: images[0].mime,
          uri: `file://${images[0]?.realPath}`,
        });
    }

    console.log('dog edit profile');
    console.log('dog formData', formData);

    dispatch(__editDogProfile({id, formData: formData}));
    if (error === null) setIsEdit(false);
  };

  //이미지 클릭시 갤러리를 여는 이벤트
  const openPicker = async () => {
    const result = requestCameraPermission();
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

  return (
    <View style={styles.dogBlock}>
      <View style={styles.dogCardShadow} />
      <View style={styles.dogCard}>
        <FastImage
          style={styles.dogImg}
          source={{
            uri: profile[1]?.dogs[1]?.contentUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={styles.dogProfileInputWrap}>
          <View style={styles.dogInputWrapInner}>
            <View style={styles.firstLine}>
              <Text style={styles.dogName}>강아지이름</Text>

              <Text style={styles.dogNameText}>
                {profile[1]?.dogs[1]?.name}
              </Text>

              <Text style={styles.representDog}>대표 강아지</Text>

              <View style={styles.representDogBox}>
                <View style={styles.checkCircleBox} />
                <View style={styles.checkCircle} />
                <View style={styles.saveBtn}>
                  <TouchableOpacity
                    onPress={() => {
                      onPressAdd();
                      onPressEdit();
                    }}>
                    {isEdit ? <ServicesPinkImg /> : <TaskPinkImg />}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.secondLine}>
              <Text style={styles.species}>종류</Text>

              <Text style={styles.speciesText}>
                {profile[1]?.dogs[1]?.species}
              </Text>

              <Text style={styles.weight}>몸무게</Text>

              <Text style={styles.weightText}>
                {profile[1]?.dogs[1]?.weight}
              </Text>
            </View>

            <View style={styles.thirdLine}>
              <Text style={styles.introduce}>강아지소개</Text>

              <Text style={styles.introduceText}>
                {profile[1]?.dogs[1]?.introduce}
              </Text>
            </View>

            <View style={styles.fourthLine}>
              <Text style={styles.birthday}>태어난 날</Text>

              <Text style={styles.birthdayText} placeholder="00.00.00">
                {profile[1]?.dogs[1]?.birthday}
              </Text>

              <Text style={styles.bringDate}>데려온 날</Text>

              <Text style={styles.bringDateText} placeholder="yyyy-mm-dd">
                {profile[1]?.dogs[1]?.bringDate}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const IMAGE_WIDTH = 264;
const IMAGE_HEIGHT = 160;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dogCard: {
    width: 264,
    height: 444,
    borderRadius: 12,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  dogCardShadow: {
    width: 264,
    height: 444,
    borderRadius: 15,
    top: '1%',
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 1,
  },

  dogProfileInputWrap: {
    width: 264,
    height: 304,
    zIndex: 2,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    bottom: '6%',
  },

  dogImg: {
    width: 264,
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#F4F4F4',
  },
  dogInputWrapInner: {
    width: 264,
    height: 304,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstLine: {
    width: 226,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 5,
    paddingTop: 8,
    // borderWidth: 1,
  },
  dogName: {
    color: 'black',
    zIndex: 2,
    position: 'absolute',
    fontSize: 12,
    top: 0,
    left: '5%',
    backgroundColor: '#ffffff',
  },
  dogNameText: {
    // borderWidth: 1,
    borderColor: 'gray',
    width: 76,
    height: 50,
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    paddingTop: '8%',
  },

  representDog: {
    color: 'black',
    zIndex: 2,
    position: 'absolute',
    fontSize: 13,
    top: 0,
    right: '20%',
    backgroundColor: '#ffffff',
  },
  representDogBox: {
    // borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    width: 108,
    height: 50,
    left: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  checkCircleBox: {
    borderWidth: 2,
    borderRadius: 50,
    width: 20,
    height: 20,
    borderColor: '#F09090',
    marginTop: '4%',
  },
  checkCircle: {
    borderWidth: 1,
    borderRadius: 50,
    width: 14,
    height: 14,
    backgroundColor: '#F09090',
    marginTop: '4%',
  },
  saveBtn: {
    width: 24,
    height: 24,
    // borderWidth: 1,
    zIndex: 3,
    marginTop: '8%',
  },

  secondLine: {
    width: 226,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 5,
    paddingTop: 8,
    // borderWidth: 1,
  },

  species: {
    color: 'black',
    zIndex: 2,
    position: 'absolute',
    fontSize: 13,
    top: 0,
    left: '5%',
    // borderWidth: 1,
    backgroundColor: '#ffffff',
  },

  speciesText: {
    // borderWidth: 1,
    borderColor: 'gray',
    width: 76,
    height: 50,
    paddingTop: '8%',
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },

  weight: {
    color: 'black',
    zIndex: 2,
    position: 'absolute',
    fontSize: 13,
    top: 0,
    right: '25%',
    // borderWidth: 1,
    backgroundColor: '#ffffff',
  },

  weightText: {
    // borderWidth: 1,
    borderColor: 'gray',
    width: 76,
    height: 50,
    paddingTop: '8%',
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    left: '20%',
  },

  thirdLine: {
    width: 226,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 5,
    paddingTop: 8,
    // borderWidth: 1,
  },

  introduce: {
    color: 'black',
    zIndex: 2,
    position: 'absolute',
    fontSize: 13,
    top: 0,
    left: '5%',
    // borderWidth: 1,
    backgroundColor: '#ffffff',
  },

  introduceText: {
    // borderWidth: 1,
    borderColor: 'gray',
    width: 226,
    height: 50,
    textAlign: 'center',
    paddingTop: '8%',
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    right: '50%',
  },

  fourthLine: {
    width: 226,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 5,
    paddingTop: 8,
    // borderWidth: 1,
  },

  birthday: {
    color: 'black',
    zIndex: 2,
    position: 'absolute',
    fontSize: 13,
    top: 0,
    left: '5%',
    backgroundColor: '#ffffff',
  },

  birthdayText: {
    // borderWidth: 1,
    borderColor: 'gray',
    width: 76,
    height: 50,
    paddingTop: '8%',
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    right: '20%',
  },
  bringDate: {
    color: 'black',
    zIndex: 2,
    position: 'absolute',
    fontSize: 13,
    top: 0,
    right: '20%',
    backgroundColor: '#ffffff',
  },
  bringDateText: {
    // borderWidth: 1,
    borderColor: 'gray',
    width: 76,
    height: 50,
    textAlign: 'center',
    paddingTop: '8%',
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },

  media: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: '#F4F4F4',
  },
});

export default InputDogProfileCard;
