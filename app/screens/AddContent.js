import React, {useRef, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import YellowButton from '../components/YellowButton';
import CancelButton from '../components/CancelButton';
import {useDispatch} from 'react-redux';

const AddContent = () => {
  // 제목 인풋상태
  const [titleText, setTitleText] = useState();
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

      // console.log('response: ', response);
      setImages(response);
    } catch (e) {
      // console.log(e.code, e.message);
    }
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
          width={IMAGE_WIDTH}
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
          <Text style={styles.titleDelete}>X</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  //for문을 돌린다??
  const dispatch = useDispatch();
  const formData = new FormData();
  const onSendFormData = () => {
    console.log('images', images);
    //서버분들이랑 얘기해보기! images안에 데이터가 있는데,
    console.log('images.real', images);
    const formList = {
      category: images.type,
      title: titleText,
      content: contentText,
      // images안에 이미지 배열이 들어있음. 그거 어떻게 분해해서 넘길건지, 어렵다.
      // 그니까 서버분들한테 부탁하기ㅎㅎ
      // files: images.realPath,
    };
    formData.append('category', images);
    formData.append('title', titleText);
    formData.append('content', contentText);
    dispatch(__addPostFormData(formData));
  };

  return (
    <SafeAreaView style={styles.containerBox}>
      <View style={styles.box}>
        <View style={styles.container}>
          <View style={styles.titleInput}>
            <TextInput
              placeholder="제목을 입력하세요"
              // returnKeyType="next"
              value={titleText}
              onChange={titleTextHandler}
            />
          </View>

          <View style={styles.contentInput}>
            <TextInput
              placeholder="내용을 입력하세요"
              maxLength={100}
              // 확인하기
              multiline={true}
              value={contentText}
              onChange={contentTextHandler}
            />
          </View>
          <View>
            <Text>{contentText.length}/100</Text>
          </View>
          <View style={styles.fileInput}>
            <View style={styles.fileupload}>
              <TouchableOpacity style={styles.openPicker} onPress={openPicker}>
                <Text style={styles.openText}>댕댕🐶 사진넣기</Text>
              </TouchableOpacity>
            </View>
            {/* 컴포넌트 맵 돌려서 스크롤뷰로 넣어주는게 나을것 같다. */}
            <FlatList
              data={images}
              keyExtractor={(item, index) =>
                (item?.filename ?? item?.path) + index
              }
              renderItem={renderItem}
              horizontal={false}
            />
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

// 코드 손보기
const {width} = Dimensions.get('window');

const IMAGE_WIDTH = (width - 24) / 3;

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
  openText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
  },

  openPicker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  imageView: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    paddingVertical: 10,
    position: 'relative',
    borderWidth: 1,
  },
  media: {
    marginLeft: 6,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginBottom: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  buttonDelete: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    position: 'absolute',
    left: 10,
    top: 15,
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
