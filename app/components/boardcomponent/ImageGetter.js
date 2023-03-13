import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {__getPostData} from '../../redux/modules/addContentSlice';
import {useIsFocused} from '@react-navigation/native';

import ImageCard from './ImageCard';
import {ActivityIndicator} from 'react-native-paper';
const ImageGetter = ({order, nickname, searchData}) => {
  // 검색에서 값을 받는 경우 searchData 가 true
  // 요청할 데이터 정렬 순서 , 카테고리 프룹스로 받기
  const imageContentList = useSelector(state => state.addContent.contentList);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // 마운트 될 때, 데이터의 정렬 순서 카테고리가 바뀔때 , 요청하기 (기본 요청은 최신순이 되도록 props받기)
  useEffect(() => {
    if (isFocused && !searchData) {
      nickname
        ? dispatch(__getPostData({category: 'image', order, nickname}))
        : dispatch(__getPostData({category: 'image', order}));
    }
  }, [order, isFocused]);
  //로딩여부
  const {isLoading} = useSelector(state => state.addContent);

  return (
    <View style={styles.getterWrapper}>
      {isLoading ? (
        <View
          style={{
            height: '99%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={'gray'} size={40} />
        </View>
      ) : (
        <SafeAreaView>
          {searchData ? (
            <FlatList
              data={searchData}
              renderItem={({item}) => (
                <View style={styles.cardColor}>
                  <ImageCard imageContent={item} title={item.title} />
                </View>
              )}
              keyExtractor={item => item.postId}
              numColumns={2}
              horizontal={false}
            />
          ) : (
            <FlatList
              data={imageContentList}
              renderItem={({item}) => (
                <View style={styles.cardColor}>
                  <ImageCard imageContent={item} title={item.title} />
                </View>
              )}
              keyExtractor={item => item.postId}
              numColumns={2}
              horizontal={false}
            />
          )}
        </SafeAreaView>
      )}
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
  },
  textStyle: {
    fontSize: 16,
  },
  cardColor: {
    width: '50%',
    alignItems: 'center',
  },
});
