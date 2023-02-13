import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

import {Colors} from '../constants/colors';
function AuthInput({
  label, //만약 라벨을 쓴다면 없다면 추후 삭제
  keyboardType,
  secure, // true false, true이면 입력창 내용 가리는 용도 (secureTextEntry에 사용)
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
  refInput,
  helper,
}) {
  //ref로 오는 경우 (Login)와 state로 오는 경우(회원가입)
  const onChangeRefHandler = e => {
    refInput.current = e;
  };
  // console.log(value); //TODO: 랜더링이 너무 많이됨 ..
  // if (refInput) {
  //   const onChangeTextHandler = onChangeRefHandler;
  // }
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      {refInput ? (
        <TextInput
          placeholder={placeholder}
          style={[styles.input, isInvalid && styles.inputInvalid]}
          autoCapitalize={false}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onChangeRefHandler} // 조건부로 onChangeText를 적용하고 싶음
          value={value}
        />
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
      {/* <TextInput
        placeholder={placeholder}
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        // onChangeText={onChangeRefHandler} // 조건부로 onChangeText를 적용하고 싶음
        onChangeText={onUpdateValue}
        value={value}
      /> */}
    </View>
  );
}

export default AuthInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 0,
    backgroundColor: 'gray',
    justifyContent: 'center',
    // height: 100,
    paddingVertical: 5,
    // alignItems: 'center',
  },
  label: {
    color: 'white',
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    backgroundColor: Colors.primary100,
    fontSize: 16,
    borderRadius: 10,
    // borderColor: 'blue',
    // borderWidth: 2,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
