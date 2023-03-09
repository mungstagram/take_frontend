import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MyText = props => {
  return (
    <View>
      <Text
        {...props}
        style={{
          ...props.style,
          fontFamily: 'Pretendard-Regular',
        }}>
        {props.children}
      </Text>
    </View>
  );
};

export default MyText;

const styles = StyleSheet.create({});
