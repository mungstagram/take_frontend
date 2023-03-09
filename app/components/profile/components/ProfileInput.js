import React from 'react';
import {TextInput} from 'react-native-paper';

const ProfileInput = ({
  label,
  long,
  placeholder,
  value,
  onUpdateValue,
  number,
}) => {
  // console.log(onUpdateValue, '프룹스받는 함수');
  return long ? (
    <TextInput
      style={{
        padding: 0,
        width: 226,
        height: 62,
        fontSize: 14,
      }}
      activeOutlineColor="black"
      mode="outlined"
      label={label}
      maxLength={22}
      placeholder={placeholder}
      value={value}
      onChangeText={onUpdateValue}
    />
  ) : (
    <TextInput
      style={{
        padding: 0,
        width: 108,
        height: 62,
        fontSize: 14,
      }}
      activeOutlineColor="black"
      mode="outlined"
      label={label}
      maxLength={10}
      placeholder={placeholder}
      value={value}
      onChangeText={onUpdateValue}
      keyboardType={number ? 'number-pad' : 'default'}
    />
  );
};

export default ProfileInput;
