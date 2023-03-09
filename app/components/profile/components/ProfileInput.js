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
  // console.log('인풋에 들어오는 value값', value);
  return long ? (
    <TextInput
      outlineStyle={{fontSize: 12}}
      style={{
        padding: 0,
        paddingVertical: 0,
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
      outlineStyle={{fontSize: 12}}
      style={{
        backgroundColor: 'transparent',
        padding: 0,
        paddingVertical: 0,
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
