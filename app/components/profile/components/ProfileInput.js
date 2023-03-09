import React from 'react';
import {TextInput} from 'react-native-paper';

const ProfileInput = ({
  label,
  long,
  placeholder,
  value,
  onUpdateValue,
  number,
  small,
}) => {
  if (small) {
    return (
      <TextInput
        outlineStyle={{fontSize: 12}}
        style={{
          padding: 0,
          marginTop: 8,
          width: 100,
          maxHeight: 62,
          height: '100%',
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
    );
  }
  return long ? (
    <TextInput
      outlineStyle={{fontSize: 12}}
      style={{
        padding: 0,
        marginTop: 8,
        width: 226,
        maxHeight: 62,
        height: '100%',
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
        maxHeight: 62,
        height: '100%',
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
