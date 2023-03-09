import React from 'react';
import {View, Text} from 'react-native';

const ProfileText = ({long, title, value}) => {
  return long ? (
    <View
      style={{
        padding: 0,
        paddingLeft: 4,
        width: 226,
        height: 62,
      }}>
      <Text style={{fontSize: 12, marginBottom: 8}}>{title}</Text>
      <Text style={{fontSize: 15, lineHeight: 24}}>{value}</Text>
    </View>
  ) : (
    <View
      style={{
        padding: 0,
        paddingLeft: 4,
        width: 108,
        height: 62,
      }}>
      <Text style={{fontSize: 12, marginBottom: 8}}>{title}</Text>
      <Text style={{fontSize: 15, lineHeight: 24}}>{value}</Text>
    </View>
  );
};
export default ProfileText;
