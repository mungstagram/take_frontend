import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const SearchNone = () => {
  return (
    <View style={styles.textContainer}>
      <Text>존재하지 않는 값입니다.</Text>
    </View>
  );
};

export default SearchNone;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
