import React, {useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {__getPostData} from '../../redux/modules/addContentSlice';

import ImageCard from './ImageCard';
const ImageGetter = ({order}) => {
  // 요청할 데이터 정렬 순서 , 카테고리 프룹스로 받기
  const imageContentList = useSelector(state => state.addContent.contentList);
  console.log(imageContentList, '게터 이미지리스트');
  const dispatch = useDispatch();

  // 마운트 될 때, 데이터의 정렬 순서 카테고리가 바뀔때 , 요청하기 (기본 요청은 최신순이 되도록 props받기)
  useEffect(() => {
    dispatch(__getPostData({category: 'image', order}));
  }, [order]);

  //FlatList 사용시 파라미터명 item이어야 함,. 아닐 때 undefined?
  return (
    <View style={styles.getterWrapper}>
      <SafeAreaView>
        <FlatList
          data={imageContentList}
          renderItem={({item}) => (
            <View style={styles.cardColor}>
              <ImageCard imageContent={item} title={item.title} />
            </View>
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          horizontal={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default ImageGetter;

const styles = StyleSheet.create({
  getterWrapper: {
    width: '96.8%',
    height: '100%',
    position: 'absolute',
    left: '1.6%',
    bottom: 0,
    // backgroundColor: 'green', //TODO : 색 원래대로
  },
  textStyle: {
    fontSize: 16,
  },
  cardColor: {
    width: '50%',
    alignItems: 'center',
  },
});
