import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {Colors, BasicColors} from '../../constants/colors';

const DetailComments = () => {
  return (
    <View style={styles.container}>
      <Text>DetailComments</Text>
      <View style={styles.comments}>
        <View style={styles.profileImg}></View>
        <TextInput></TextInput>
      </View>
    </View>
  );
};

export default DetailComments;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BasicColors.whiteColor,
  },
  comments: {
    width: '100%',
  },
  profileImg: {
    backgroundColor: BasicColors.grayColor,
    borderRadius: 100,
    width: 24,
    height: 24,
  },
});
