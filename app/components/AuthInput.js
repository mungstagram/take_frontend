import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

import {Colors} from '../constants/colors';

function AuthInput({
  label,
  keyboardType,
  secure, // true false, true이면 입력창 내용 가리는 용도 (secureTextEntry에 사용)
  onUpdateValue,
  value,
  isInvalid,
  title,
  refInput,
}) {
  // console.log(refInput); //idInput
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        placeholder={title}
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize={false}
        // autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        ref={refInput}
      />
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
