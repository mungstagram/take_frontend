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
import {useDispatch, useSelector} from 'react-redux';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Surface, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

import {__postAddContentFormData} from '../../redux/modules/addContentSlice';
import YellowButton from '../YellowButton';
import CancelButton from '../CancelButton';
import {Colors, BasicColors} from '../../constants/colors';
import GoBackButton from '../common/GoBackButton';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import {__putPostDetailData} from '../../redux/modules/commetsSlice';
import {__getPostDetailData} from '../../redux/modules/commetsSlice';

const ModifyImage = ({route}) => {
  const fileData = useSelector(state => state.comments.detail);
  console.log('fi', fileData);
  // 제목 인풋상태
  const [titleText, setTitleText] = useState(fileData.title);
  // console.log(titleText);
  //제목 인풋 핸들러
  const titleTextHandler = event => {
    //console.log('제목', event.nativeEvent.text);
    setTitleText(event.nativeEvent.text);
  };
  // 내용 인풋상태
  const [contentText, setContentText] = useState(fileData.content);

  // 내용 인풋 핸들러
  const contentTextHandler = event => {
    //console.log('내용', event.nativeEvent.text);
    setContentText(event.nativeEvent.text);
  };
  const navigation = useNavigation();

  const onCancelHandler = ({route}) => {
    Alert.alert(
      '게시글 수정을 정말로 취소하시겠습니까?',
      '🐾 진짜 취소하실건가요 ~?',
      [
        {
          text: '취소하기',
          onPress: () => console.log('취소'),
        },
        {
          text: '네',
          onPress: () => {
            Alert.alert('게시글 작성을 취소하였습니다.'), navigation.goBack();
          },
        },
      ],
    );
  };
  const onDoneHandler = () => {
    if (titleText === '') {
      return Alert.alert('제목을 넣어주세요');
    } else if (contentText === '') {
      return Alert.alert('내용을 넣어주세요');
    } else {
      Alert.alert('게시글 수정을 완료하시겠습니까?', '', [
        {
          text: '취소하기',
          onPress: () => console.log('취소'),
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () => {
            dispatch(
              __putPostDetailData({
                postId: fileData.postId,
                title: titleText,
                content: contentText,
                category: 'image',
              }),
            ),
              navigation.goBack();
          },
        },
      ]);
    }
  };

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(__getPostDetailData(route.params.postId));
    }
  }, [isFocused]);

  //사진 미리보기
  const renderItem = ({item}) => {
    return (
      <ScrollView style={styles.imageView}>
        <Image
          source={{
            uri: item,
          }}
          style={styles.imageScreen}
          resizeMode="contain"
        />
      </ScrollView>
    );
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <SafeAreaView style={styles.containerBox}>
        <View style={styles.goBackButton}>
          <GoBackButton />
        </View>
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.fileInput}>
              <View style={styles.fileupload}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryInfoText}>등록된 사진 확인</Text>
                </View>
                <View style={styles.openfileView}>
                  <FlatList
                    style={styles.imagesScreen}
                    data={fileData.contentUrl}
                    keyExtractor={item => item}
                    renderItem={renderItem}
                    horizontal={true}
                  />
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
                  onChange={titleTextHandler}></TextInput>
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
                  <Text style={styles.textCount}>
                    {contentText.length}/2000
                  </Text>
                </View>
              </Surface>
            </View>
            <View style={styles.buttonRow}>
              <View>
                <TouchableOpacity
                  style={styles.buttonBox}
                  onPress={onCancelHandler}>
                  <Text style={styles.button}>취소</Text>
                </TouchableOpacity>
              </View>
              <YellowButton style={styles.doneBtn} onPress={onDoneHandler}>
                수정완료
              </YellowButton>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ModifyImage;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageCardWidth = windowWidth * 0.92;
const imageCardHeight = imageCardWidth * 0.52;

const styles = StyleSheet.create({
  containerBox: {
    width: windowWidth,
    height: windowHeight,
    //backgroundColor: 'red',
  },
  goBackButton: {
    width: imageCardWidth,
    height: 58,
    alignItems: 'flex-start',
    marginLeft: '7%',
    paddingTop: 18,
    zIndex: 20,
    flex: 1,
  },
  container: {
    width: windowWidth,
    height: windowHeight * 0.81,
    flex: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  box: {
    width: imageCardWidth,
    height: windowHeight * 0.8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  fileInput: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
    height: imageCardHeight,
  },
  fileupload: {
    width: imageCardWidth,
    height: imageCardHeight,
  },
  categoryInfo: {
    height: 20,
  },
  categoryInfoText: {
    fontSize: 12,
  },
  openfileView: {},
  imageScreen: {
    width: windowWidth * 0.333,
    height: windowWidth * 0.333,
    zIndex: 10,
    marginRight: windowWidth * 0.02,
    backgroundColor: BasicColors.blackColor,
  },
  imagesScreen: {},
  media: {
    width: windowWidth * 0.333,
    height: windowWidth * 0.333,

    zIndex: 10,
    backgroundColor: BasicColors.blackColor,
  },
  textBox: {
    flex: 7,
    width: imageCardWidth,
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
    position: 'absolute',
    bottom: '12%',
    color: BasicColors.grayColor,
  },
  buttonRow: {
    flex: 1,
    marginTop: 28,
    width: imageCardWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonBox: {
    width: imageCardWidth * 0.475,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.userDataColor,
    backgroundColor: BasicColors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
