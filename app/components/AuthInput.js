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
  isInvalid, // 에러 여부에 따른 인풋 색깔 조절용 변수 (true, false)
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
        {refInput ? (
          <View style={[styles.input, !isInvalid && styles.inputInvalid]}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputDirection}>
              <TextInput
                placeholder={placeholder}
                style={styles.textStyle}
                autoCapitalize={false}
                keyboardType={keyboardType}
                secureTextEntry={secure}
                onChangeText={onChangeRefHandler} // 조건부로 onChangeText를 적용하고 싶음
                value={value}
                // ref = {refInput} //리액트경우
              />
              <View style={styles.iconPostioner}>
                {secure
                  ? setSecureSetter && (
                      <Pressable
                        style={styles.pressableContainer}
                        onPress={onVisibilityHandler}>
                        <PassWordVisibility />
                      </Pressable>
                    )
                  : setSecureSetter && (
                      <Pressable
                        style={styles.pressableContainer}
                        onPress={onVisibilityHandler}>
                        <PassWordVisibilityOff />
                      </Pressable>
                    )}
              </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
              {label}
            </Text>
            <TextInput
              placeholder={placeholder}
              style={[styles.input, isInvalid && styles.inputInvalid]}
              autoCapitalize={false}
              keyboardType={keyboardType}
              secureTextEntry={secure}
              onChangeText={onUpdateValue}
              value={value}
            />
            {/* <Text> {helper} </Text> */}
          </View>
        )}
      </View>
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    paddingVertical: 12,
    width: ' 100%',
    // backgroundColor: 'green',
  },
  label: {
    color: 'white',
    fontSize: 8,
  },
  labelInvalid: {
    color: 'red',
    fontSize: 8,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 8,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: Colors.primary100,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary100,
  },
  inputInvalid: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 8,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    backgroundColor: Colors.primary100,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  labelStyle: {
    fontSize: 8,
  },
  textStyle: {
    padding: 0,
    fontSize: 16,
    // backgroundColor: 'red',
  },
  inputDirection: {
    flexDirection: 'row',
  },
  pressableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    height: '95%',
  },
  iconPostioner: {
    position: 'absolute',
    bottom: '1%',
    right: '3%',
    marginHorizontal: 4,
    height: '100%',
  },
});
