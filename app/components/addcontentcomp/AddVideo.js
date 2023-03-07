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
    setVideos(data);
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
    if (videos.length === 0) {
      return Alert.alert('사진을 넣어주세요');
    } else if (titleText === '') {
      return Alert.alert('제목을 넣어주세요');
    } else if (contentText === '') {
      return Alert.alert('내용을 넣어주세요');
    } else {
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
      setVideos([]);
    }
  };

  const navigation = useNavigation();

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
            Alert.alert('게시글 작성을 취소하였습니다.'),
              navigation.reset('Home');
          },
        },
      ],
    );
  };
  return (
    <SafeAreaView style={styles.containerBox}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.box}>
          <View style={styles.fileInput}>
            <View style={styles.fileupload}>
              <View style={styles.openfileView}>
                <FlatList
                  style={styles.videoScreen}
                  data={videos}
                  keyExtractor={(item, index) =>
                    (item?.filename ?? item?.path) + index
                  }
                  renderItem={renderItem}
                  horizontal={true}
                />
              </View>
              <View style={styles.openfileBtn}>
                {openCamera && (
                  <TouchableOpacity
                    style={styles.openPicker}
                    onPress={openPicker}>
                    <AddCircle />
                  </TouchableOpacity>
                )}
                {!openCamera && (
                  <TouchableOpacity
                    style={styles.openPicker2}
                    onPress={openAgainPicker}>
                    <AddCircle />
                  </TouchableOpacity>
                )}
                <View style={styles.videoBack}></View>
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
                <Text style={styles.textCount}>{contentText.length}/2000</Text>
              </View>
            </Surface>
          </View>
          <View style={styles.buttonRow}>
            <CancelButton style={styles.cancelBtn} onPress={onCancelHandler}>
              취소
            </CancelButton>
            <YellowButton style={styles.doneBtn} onPress={onSendFormData}>
              작성완료
            </YellowButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddVideo;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.92;
const videoCardHeight = videoCardWidth * 0.52;

const styles = StyleSheet.create({
  containerBox: {},
  box: {
    height: windowHeight * 0.81,
    flexDirection: 'column',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  fileInput: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    flex: 3,
    //backgroundColor: 'red',
  },
  fileupload: {
    marginTop: 20,
    width: videoCardWidth,
    height: videoCardHeight,
  },
  openfileView: {
    width: videoCardWidth,
    height: videoCardHeight,
  },
  openfileBtn: {
    width: videoCardWidth,
    height: videoCardHeight,
    //backgroundColor: 'red',
    zIndex: 20,
    bottom: '100%',
  },
  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: videoCardWidth,
    height: videoCardHeight,
  },
  openPicker2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: videoCardWidth,
    height: videoCardHeight,
  },
  videoScreen: {
    width: videoCardWidth,
    height: videoCardHeight,
    zIndex: 10,
    backgroundColor: BasicColors.grayColor,
  },
  media: {
    width: videoCardWidth,
    height: videoCardHeight,
    zIndex: 10,
    backgroundColor: BasicColors.blackColor,
  },
  videoBack: {
    width: videoCardWidth,
    height: videoCardHeight,
  },
  textBox: {
    flex: 4,
    width: videoCardWidth,
    height: windowHeight * 0.36,
    alignContent: 'center',
  },
  titleInput: {
    borderRadius: 4,
    marginBottom: 12,
    flex: 1,
    paddingHorizontal: '4%',
    backgroundColor: BasicColors.whiteColor,
  },
  contentInput: {
    borderRadius: 4,
    flex: 3,
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
  // buttonDelete: {
  //   paddingHorizontal: 8,
  //   paddingVertical: 3,
  //   position: 'absolute',
  //   right: 4,
  //   top: 4,
  //   marginTop: 3,
  //   width: 22,
  //   height: 22,
  //   backgroundColor: '#ffffff92',
  //   borderRadius: 4,
  // },
  // titleDelete: {
  //   fontWeight: 'bold',
  //   fontSize: 12,
  //   color: BasicColors.blackColor,
  // },
  buttonRow: {
    flex: 1,
    width: videoCardWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
