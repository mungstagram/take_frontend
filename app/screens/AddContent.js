import React from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';

import YellowButton from '../components/YellowButton';
import CancelButton from '../components/CancelButton';

const AddContent = () => {
  return (
    <View style={styles.box}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text>로고 들어갈 자리</Text>
        </View>
        <View style={styles.titleInput}>
          <TextInput placeholder="제목을 입력하세요" />
        </View>
        <View style={styles.contentInput}>
          <TextInput placeholder="제목을 입력하세요" />
        </View>
        <View>
          <Text>0/600</Text>
        </View>
        <View style={styles.imageInput}>
          <TextInput placeholder="제목을 입력하세요" />
        </View>
        <View style={styles.buttonRow}>
          <CancelButton>Cancel</CancelButton>
          <YellowButton>Done</YellowButton>
        </View>
      </View>
    </View>
  );
};

export default AddContent;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  top: {
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
  imageInput: {
    flex: 2,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  },
});
