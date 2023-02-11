import {StyleSheet, View, Pressable, Text} from 'react-native';
import {Colors} from '../constants/Colors';
import React from 'react';

function Button({children, onPress}) {
  //TODO: 디자인 나오고 수정 해야할듯 로그인 사인업 등록에 쓸 듯. 색 크기 조정을 해당 페이지에서?
  return (
    <Pressable
      style={({pressed}) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    // width: 200,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
