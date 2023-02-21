import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import YellowButton from '../components/YellowButton';
import CancelButton from '../components/CancelButton';

import {__postAddContentFormData} from '../redux/modules/addContentSlice';

const AddContent = () => {
  // 제목 인풋상태
  const [titleText, setTitleText] = useState();
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

      // console.log('response: ', response);
      setVideos(response);
    } catch (e) {
      // console.log(e.code, e.message);
    }
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
      <Image
        // width={IMAGE_WIDTH}
        source={{
          uri:
            item?.type === 'image'
              ? 'file://' + (item?.crop?.cropPath ?? item.realPath)
              : 'file://' + (item?.crop?.cropPath ?? item.realPath),
        }}
        style={styles.media}
      />
    );
  };

  const dispatch = useDispatch();

  // 폼데이터 선언 및 전송
  const formData = new FormData();
  const onSendFormData = () => {
    console.log('videos', videos[0]);

    console.log('videos.real', videos[0].realPath);
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
  };
  // 이미지파일 넣는 부분
  // formData.append('files', { uri: `file://${profileImg[0].realPath}`, name: profileImg[0].fileName, type: profileImg[0].mime })
  return (
    <SafeAreaView style={styles.containerBox}>
      <View style={styles.box}>
        <View style={styles.container}>
          <View style={styles.fileInput}>
            <View style={styles.fileupload}>
              <FlatList
                data={videos}
                keyExtractor={(item, index) =>
                  (item?.filename ?? item?.path) + index
                }
                renderItem={renderItem}
                horizontal={true}
              />
              <View>
                {openCamera && (
                  <TouchableOpacity
                    style={styles.openPicker}
                    onPress={openPicker}>
                    <Text style={styles.openText}>댕댕🐶 영상넣기</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View style={styles.titleInput}>
            <TextInput
              placeholder="제목을 입력하세요(20자 이하)"
              maxLength={20}
              // returnKeyType="next"
              value={titleText}
              onChange={titleTextHandler}
            />
          </View>
          <View style={styles.contentInput}>
            <TextInput
              placeholder="내용을 입력하세요(300자 이하)"
              maxLength={300}
              // 확인하기
              multiline={true}
              value={contentText}
              onChange={contentTextHandler}
            />
          </View>
          <View>
            <Text>{contentText.length}/100</Text>
          </View>
          <View style={styles.buttonRow}>
            <CancelButton>Cancel</CancelButton>
            <YellowButton onPress={onSendFormData}>Done</YellowButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddContent;

const IMAGE_WIDTH = 960;

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
  },
  box: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  titleInput: {
    flex: 1,
    border: 1,
    borderColor: '#ffac53',
  },
  contentInput: {
    flex: 3,
  },
  fileInput: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileupload: {
    height: IMAGE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  openPicker2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5b5b5b',
  },
  openText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
    paddingVertical: 12,
  },
  imageView: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    position: 'relative',
    marginRight: 6,
    borderWidth: 1,
  },
  media: {
    width: 100,
    height: 540,
    backgroundColor: 'rgba(0,0,0,0.2)',
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
    color: '#000',
  },
});
