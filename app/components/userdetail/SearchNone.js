import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

import MyText from '../common/MyText';

const SearchNone = () => {
  return (
    <View style={styles.textContainer}>
      <MyText style={styles.textStyle}>
        검색 단어에 대한 결과가 없습니다.
      </MyText>
      <Image
        source={require('../../assets/searchedNone.png')}
        resizeMode={'cover'}
      />
    </View>
  );
};

export default SearchNone;

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 60,
    width: 312,
    height: 360,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
  },
  textStyle: {
    marginTop: 40,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
});
