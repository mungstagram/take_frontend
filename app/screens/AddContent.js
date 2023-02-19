import React, {useState} from 'react';
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
} from 'react-native';

import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

import YellowButton from '../components/YellowButton';
import CancelButton from '../components/CancelButton';

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

  // * 사진관련 코드
  const [images, setImages] = useState([]);
  // 사진넣기 버튼 클릭시 작동하는 이벤트
  const openPicker = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        usedCameraButton: true,
        mediaType: 'image',
        maxVideo: 5,
        selectedAssets: images,
        isExportThumbnail: true,
        isCrop: true,
        isCropCircle: true,
        //singleSelectedMode: true,
      });

      console.log('response: ', response);
      setImages(response);
    } catch (e) {
      console.log(e.code, e.message);
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
    console.log('dd', item);
    return (
      <View style={styles.imageView}>
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
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerBox}>
      <View style={styles.box}>
        <View style={styles.container}>
          <View style={styles.titleInput}>
            <TextInput
              placeholder="제목을 입력하세요"
              value={titleText}
              onChange={titleTextHandler}
            />
          </View>
          <View style={styles.contentInput}>
            <TextInput
              placeholder="내용을 입력하세요"
              maxLength={100}
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
            <FlatList
              data={images}
              keyExtractor={(item, index) =>
                (item?.filename ?? item?.path) + index
              }
              renderItem={renderItem}
              numColumns={3}
            />
          </View>
          <View style={styles.buttonRow}>
            <CancelButton>Cancel</CancelButton>
            <YellowButton>Done</YellowButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddContent;

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
    flexWrap: 'wrap',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
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
    position: 'relative',
    right: 25,
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
