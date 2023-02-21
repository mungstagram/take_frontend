import React, {useEffect} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {__getPostData} from '../../redux/modules/addContentSlice';

const ImageGetter = ({category, order}) => {
  // 요청할 데이터 정렬 순서 , 카테고리 프룹스로 받기

  const dispatch = useDispatch();

  // 마운트 될 때, 데이터의 정렬 순서 카테고리가 바뀔때 , 요청하기 (기본 요청은 최신순이 되도록 props받기)
  useEffect(() => {
    dispatch(__getPostData({category, order}));
  }, [category, order]);

  return (
    <View style={styles.getterWrapper}>
      <Text style={styles.textStyle}>로그아웃(꾸며주세요)</Text>
    </View>
  );
};

export default ImageGetter;

const styles = StyleSheet.create({
  getterWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'green', //TODO : 색 원래대로
  },
  textStyle: {
    fontSize: 16,
  },
});
