import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Surface, Text} from 'react-native-paper';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {useNavigation} from '@react-navigation/native';

import {__postAddContentFormData} from '../../redux/modules/addContentSlice';
import YellowButton from '../YellowButton';
import CancelButton from '../CancelButton';
import {Colors, BasicColors} from '../../constants/colors';
import AddCircle from '../svg/AddCircle';
import MyText from '../common/MyText';

const AddImage = () => {
  // 제목 인풋상태
  const [titleText, setTitleText] = useState('');
  // console.log(titleText);
  //제목 인풋 핸들러
  const titleTextHandler = event => {
    //console.log('제목', event.nativeEvent.text);
    setTitleText(event.nativeEvent.text);
  };
  // 내용 인풋상태
  const [contentText, setContentText] = useState('');

  // 내용 인풋 핸들러
  const contentTextHandler = event => {
    //console.log('내용', event.nativeEvent.text);
    setContentText(event.nativeEvent.text);
  };
  //사진넣기버튼의 사용가능여부조절
  const [openCamera, setOpenCamera] = useState(false);
  // //사진업로드 버튼 눌렀을 때 권한묻기
  // // useEffect는 처음 화면이 렌더링 됐을 때도 실행되기 떄문에 사용할 수 없음.
  // // Dependecy에 변수지정하기 // 마운트할때는 무조건 실행되는거!
  // 온클릭을 했을때 퍼미션을 실행할거냐 게시글작성 마운트될때 실행할거냐!

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
        // 총 선택 가능한 모든파일 수
        maxSelectedAssets: 5,
        // 총 선택 가능한 영상 수
        // maxVideo: 1,
        selectedAssets: images,
        isExportThumbnail: true,
        isCrop: true,
        isCropCircle: true,
        //singleSelectedMode: true,
      });
      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      // console.log(e.code, e.message);
    }
  };
  // console.log('Add images', images);
  // 권한 거절 후 다시 시도할때
  const openAgainPicker = () => {
    setOpenCamera(true);
    openPicker();
  };
  //remove 라는 이름을 많이 쓴다고 한다.

  const onDelete = value => {
    const data = images.filter(
      item =>
        item?.localIdentifier &&
        item?.localIdentifier !== value?.localIdentifier,
    );
    setImages(data);
  };
  // 사진 출력
  //출력되는 사진들에 각각 삭제버튼을 만들어 줌.
  const renderItem = ({item, index}) => {
    return (
      <ScrollView style={styles.imageView}>
        <Image
          // width={IMAGE_WIDTH}
          source={{
            uri:
              item?.type === 'video'
                ? 'file://' + (item?.crop?.cropPath ?? item.realPath)
                : 'file://' + (item?.crop?.cropPath ?? item.realPath),
          }}
          style={styles.media}
        />
        <TouchableOpacity
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={styles.buttonDelete}>
          <MyText style={styles.titleDelete}>X</MyText>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  const navigation = useNavigation();
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
      const formList = {
        category: 'image',
        title: titleText,
        content: contentText,
        files: images,
      };
      formData.append('category', 'image');
      formData.append('title', titleText);
      formData.append('content', contentText);
      formData.append('files', {
        name: images[0].fileName,
        type: images[0].mime,
        uri: `file://${images[0].realPath}`,
      });

      dispatch(__postAddContentFormData(formData));
      setTitleText('');
      setContentText('');
      setImages([]);
      navigation.navigate('userDetail');
    }
  };

  const onCancelHandler = () => {
    Alert.alert(
      '게시글 작성을 정말로 취소하시겠습니까?',
      '🐾 진짜 취소하실건가요 ~?',
      [
        {
          text: '취소하기',
          onPress: () => console.log('취소'),
        },
        {
          text: '네',
          onPress: () => {
            Alert.alert('게시글 작성을 취소하였습니다.');
          },
        },
      ],
    );
  };
  return (
    <SafeAreaView style={styles.containerBox}>
      <View style={styles.box}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.textBox}>
            <Surface style={styles.titleInput}>
              <TextInput
                placeholder="제목을 입력하세요(15자 이하)"
                maxLength={15}
                returnKeyType="next"
                multiline={false}
                value={titleText}
                onChange={titleTextHandler}
              />
            </Surface>
            <Surface style={styles.contentInput}>
              <TextInput
                placeholder="내용을 입력하세요(2000자 이하)"
                maxLength={2000}
                multiline={true}
                value={contentText}
                onChange={contentTextHandler}
              />
              <View style={styles.contentCount}>
                <MyText style={styles.textCount}>
                  {contentText.length}/2000
                </MyText>
              </View>
            </Surface>
          </View>
          <View style={styles.fileInput}>
            <View style={styles.fileupload}>
              {openCamera && (
                <Pressable style={styles.openPicker} onPress={openPicker}>
                  <AddCircle />
                </Pressable>
              )}
              {!openCamera && (
                <Pressable style={styles.openPicker2} onPress={openAgainPicker}>
                  <AddCircle />
                </Pressable>
              )}
            </View>

            <FlatList
              style={styles.imagesScreen}
              data={images}
              keyExtractor={(item, index) =>
                (item?.filename ?? item?.path) + index
              }
              renderItem={renderItem}
              horizontal={true}
            />
          </View>
          <View style={styles.buttonRow}>
            <CancelButton>Cancel</CancelButton>
            <YellowButton onPress={onSendFormData}>Done</YellowButton>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default AddImage;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.92;
const videoCardHeight = videoCardWidth * 0.52;

const styles = StyleSheet.create({
  containerBox: {
    backgroundColor: BasicColors.whiteColor,
  },
  box: {
    height: windowHeight * 0.81,
    flexDirection: 'column',
    alignItems: 'center',
  },
  textBox: {
    flex: 4,
    width: videoCardWidth,
    height: windowHeight * 0.36,
    alignContent: 'center',
    marginTop: 20,
  },
  titleInput: {
    borderRadius: 4,
    borderColor: BasicColors.grayColor,
    marginBottom: 12,
    flex: 1,
    elevation: 1,
    paddingHorizontal: '4%',
    backgroundColor: BasicColors.whiteColor,
  },
  contentInput: {
    borderRadius: 4,
    borderColor: BasicColors.grayColor,
    flex: 3,
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    backgroundColor: BasicColors.whiteColor,
  },
  contentCount: {
    alignItems: 'flex-end',
    marginBottom: '2%',
  },
  textCount: {
    color: BasicColors.grayColor,
  },
  fileInput: {
    width: videoCardWidth,
    height: videoCardHeight,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 12,
  },
  fileupload: {
    height: windowWidth * 0.245,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.245,
    height: windowWidth * 0.245,
    backgroundColor: BasicColors.grayColor,
    marginRight: 6,
  },
  openPicker2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.245,
    height: windowWidth * 0.245,
    backgroundColor: BasicColors.darkGrayColor,
    marginRight: 6,
  },
  imageView: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginRight: 6,
    width: windowWidth * 0.245,
    height: windowWidth * 0.245,
  },
  imagesScreen: {
    height: windowWidth * 0.245,
  },
  media: {
    width: windowWidth * 0.245,
    height: windowWidth * 0.245,
  },
  buttonDelete: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    position: 'absolute',
    right: 4,
    top: 4,
    marginTop: 3,
    width: 22,
    height: 22,
    backgroundColor: '#ffffff92',
    borderRadius: 4,
  },
  titleDelete: {
    fontWeight: 'bold',
    fontSize: 12,
    color: BasicColors.blackColor,
  },
  buttonRow: {
    flex: 1,
    width: videoCardWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
