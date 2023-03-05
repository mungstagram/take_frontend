import {StyleSheet, View, Pressable, Text} from 'react-native';
import {Colors} from '../../constants/colors';
import React from 'react';

const AuthButton = ({children, onPress, border, disabled}) => {
  //TODO: 디자인 나오고 수정 해야할듯 로그인 사인업 등록에 쓸 듯. 색 크기 조정을 해당 페이지에서?
  return (
    <View style={styles(disabled).disabled}>
      <Pressable
        disabled={disabled}
        style={({pressed}) => [
          styles(border).button,
          pressed && styles(border).pressed,
        ]}
        onPress={onPress}>
        <View>
          <Text style={styles().buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AuthButton;

const styles = value =>
  StyleSheet.create({
    button: {
      borderRadius: 4,
      paddingVertical: 12,
      backgroundColor: value ? 'white' : Colors.mainColorBright,
      borderColor: Colors.mainColorBright,
      borderWidth: 1,
      alignItems: 'center',
    },
    pressed: {
      opacity: 0.7,
    },
    buttonText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
    },
    disabled: {
      opacity: value ? 0.5 : 1,
    },
  });
