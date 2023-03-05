import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
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

const AddVideo = () => {
  // 제목 인풋상태
  const [titleText, setTitleText] = useState('');
  // console.log(titleText);
  //제목 인풋 핸들러
  const titleTextHandler = event => {
    console.log('제목', event.nativeEvent.text);
    setTitleText(event.nativeEvent.text);
  };
  // 내용 인풋상태
  const [contentText, setContentText] = useState('');

  // 내용 인풋 핸들러
  const contentTextHandler = event => {
    console.log('내용', event.nativeEvent.text);
    setContentText(event.nativeEvent.text);
  };
  //사진넣기버튼의 사용가능여부조절
  const [openCamera, setOpenCamera] = useState(false);
  // 사진업로드 버튼 눌렀을 때 권한묻기
  // useEffect는 처음 화면이 렌더링 됐을 때도 실행되기 떄문에 사용할 수 없음.
  // Dependecy에 변수지정하기 마운트할때는 무조건 실행되는거!
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
        // console.warn(error);
      }
    };
    requestCameraPermission();
  }, []);
  // * 사진관련 코드
  const [videos, setVideos] = useState([]);
  // 사진넣기 버튼 클릭시 작동하는 이벤트
  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        usedCameraButton: true,
        mediaType: 'video',
        // 총 선택 가능한 모든파일 수
        maxSelectedAssets: 1,
        // 총 선택 가능한 영상 수
        maxVideo: 1,
        selectedAssets: videos,
        isExportThumbnail: true,
        isCrop: true,
        isCropCircle: true,
        //singleSelectedMode: true,
      });

      setVideos(response);
    } catch (e) {}
  };
  // 권한 거절 후 다시 시도할때
  const openAgainPicker = () => {
    setOpenCamera(true);
    openPicker();
  };
  //remove 라는 이름을 많이 쓴다고 한다.

  const onDelete = value => {
    const data = videos.filter(
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
      <ScrollView>
        <Image
          // width={IMAGE_WIDTH}
          source={{
            uri:
              item?.type === 'image'
                ? 'file://' + (item?.crop?.cropPath ?? item.realPath)
                : 'file://' + (item?.crop?.cropPath ?? item.realPath),
          }}
          style={styles.media}
          resizeMode={'contain'}
        />
        <TouchableOpacity
          onPress={() => onDelete(item)}
          activeOpacity={0.9}
          style={styles.buttonDelete}>
          <Text style={styles.titleDelete}>X</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const dispatch = useDispatch();

  // 폼데이터 선언 및 전송
  const formData = new FormData();
  const onSendFormData = () => {
    if (videos !== []) {
      return Alert.alert('제목을 넣어주세요');
    } else if (titleText === '') {
      return Alert.alert('내용을 넣어주세요');
    } else if (contentText === '') {
      return Alert.alert('사진을 넣어주세요');
    } else {
      console.log(formData);

      const formList = {
        category: 'video',
        title: titleText,
        content: contentText,
        files: videos,
      };
      formData.append('category', 'video');
      formData.append('title', titleText);
      formData.append('content', contentText);
      formData.append('files', {
        name: videos[0].fileName,
        type: videos[0].mime,
        uri: `file://${videos[0].realPath}`,
      });
      console.log(formData);
      dispatch(__postAddContentFormData(formData));
      setTitleText('');
      setContentText('');
      setImages([]);
    }
  };

  const navigation = useNavigation();

  const onCancelHandler = () => {
    Alert.alert();
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.containerBox}>
      <View style={styles.box}>
        <View style={styles.fileInput}>
          <View style={styles.fileupload}>
            <FlatList
              style={styles.videoScreen}
              data={videos}
              keyExtractor={(item, index) =>
                (item?.filename ?? item?.path) + index
              }
              renderItem={renderItem}
              horizontal={true}
            />
            <View style={styles.openfileBtn}>
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
          </View>
        </View>
        <View style={styles.textBox}>
          <Surface style={styles.titleInput}>
            <TextInput
              placeholder="제목을 입력하세요(15자 이하)"
              maxLength={15}
              returnKeyType="next"
              value={titleText}
              onChange={titleTextHandler}
            />
          </Surface>
          <Surface style={styles.contentInput}>
            <TextInput
              placeholder="내용을 입력하세요(2000자 이하)"
              maxLength={2000}
              // 확인하기
              multiline={true}
              value={contentText}
              onChange={contentTextHandler}
            />
            <View style={styles.contentCount}>
              <Text>{contentText.length}/2000</Text>
            </View>
          </Surface>
        </View>
        <View style={styles.buttonRow}>
          <CancelButton style={styles.cancelBtn} onPress={onCancelHandler}>
            Cancel
          </CancelButton>
          <YellowButton style={styles.doneBtn} onPress={onSendFormData}>
            Done
          </YellowButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddVideo;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.92;
const videoCardHeight = videoCardWidth * 0.52;

const styles = StyleSheet.create({
  containerBox: {
    backgroundColor: BasicColors.whiteColor,
  },
  box: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fileInput: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    flex: 3,
  },
  fileupload: {
    marginTop: 20,
    width: videoCardWidth,
    height: videoCardHeight,
  },
  openfileBtn: {},
  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: videoCardWidth,
    height: videoCardHeight,
    backgroundColor: BasicColors.grayColor,
  },
  openPicker2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: videoCardWidth,
    height: videoCardHeight,
    backgroundColor: BasicColors.darkGrayColor,
  },
  openVideoPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: videoCardWidth,
    height: videoCardHeight,
    zIndex: 10,
    backgroundColor: BasicColors.darkGrayColor,
    opacity: 0.1,
  },
  videoScreen: {
    width: videoCardWidth,
    height: videoCardHeight,
    zIndex: 2,
  },
  media: {
    width: videoCardWidth,
    height: videoCardHeight,
    backgroundColor: BasicColors.blackColor,
  },
  textBox: {
    flex: 4,
    width: videoCardWidth,
    height: windowHeight * 0.36,
    alignContent: 'center',
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
  buttonRow: {
    flex: 1,
    width: videoCardWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
