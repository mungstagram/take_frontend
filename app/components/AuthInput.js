import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import React from 'react';

import {Colors} from '../constants/colors';
import PassWordVisibility from './svg/PassWordVisibility';
import PassWordVisibilityOff from './svg/PassWordVisibilityOff';
const AuthInput = ({
  label, //만약 라벨을 쓴다면 없다면 추후 삭제
  keyboardType,
  secure, // true false, true이면 입력창 내용 가리는 용도 (secureTextEntry에 사용)
  onUpdateValue, //로그인에서 사용된 인풋state를 변경하는 setState
  value, // 회원가입에서는 useState를 통해서 입력을 함. useState에 저장된 인풋값.
  isInvalid,
  placeholder,
  refInput, // 로그인 경우 ref를 통해 로그인 함.. 로그인에 사용되는 인풋 값
  helper,
  setSecureSetter,
}) => {
  //ref로 오는 경우 (Login)와 state로 오는 경우(회원가입)
  const onChangeRefHandler = e => {
    refInput.current = e;
  };

  // 비밀번호 secure 기능 온 오프 함수
  const onVisibilityHandler = e => {
    setSecureSetter(!secure);
  };

  return (
    <View style={styles.inputContainer}>
      <View>
        <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
          {label}
        </Text>
        {refInput ? (
          <View>
            <TextInput
              placeholder={placeholder}
              style={[styles.input, isInvalid && styles.inputInvalid]}
              autoCapitalize={false}
              keyboardType={keyboardType}
              secureTextEntry={secure}
              onChangeText={onChangeRefHandler} // 조건부로 onChangeText를 적용하고 싶음
              value={value}
              // ref = {refInput} //리액트경우
            />
            <Pressable onPress={onVisibilityHandler}>
              {secure
                ? setSecureSetter && <PassWordVisibility />
                : setSecureSetter && <PassWordVisibilityOff />}
            </Pressable>
          </View>
        ) : (
          <View>
            <TextInput
              placeholder={placeholder}
              style={[styles.input, isInvalid && styles.inputInvalid]}
              autoCapitalize={false}
              keyboardType={keyboardType}
              secureTextEntry={secure}
              onChangeText={onUpdateValue}
              value={value}
            />
            <Text> {helper} </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 0,
    justifyContent: 'center',
    paddingVertical: 10,
    width: ' 100%',
    backgroundColor: 'red',
  },
  label: {
    color: 'white',
  },
  labelInvalid: {
    color: 'red',
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: Colors.primary100,
  },
  inputInvalid: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: Colors.primary100,
    borderBottomColor: 'red',
  },
});
