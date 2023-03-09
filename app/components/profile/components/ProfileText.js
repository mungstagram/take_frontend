import React from 'react';
import {View, Text} from 'react-native';
import MyText from '../../common/MyText';
const ProfileText = ({long, title, value}) => {
  return long ? (
    <View
      style={{
        padding: 0,
        paddingLeft: 4,
        width: 240,
        height: 62,
      }}>
      <MyText style={{fontSize: 12, marginBottom: 8}}>{title}</MyText>
      <MyText style={{fontSize: 15, lineHeight: 24}}>{value}</MyText>
    </View>
  ) : (
    <View
      style={{
        padding: 0,
        paddingLeft: 4,
        width: 116,
        height: 62,
      }}>
      <MyText style={{fontSize: 12, marginBottom: 8}}>{title}</MyText>
      <MyText style={{fontSize: 15, lineHeight: 24}}>{value}</MyText>
    </View>
  );
};
export default ProfileText;
