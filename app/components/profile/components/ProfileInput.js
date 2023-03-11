import React from 'react';
import {TextInput} from 'react-native-paper';
import {View} from 'react-native';
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
        outlineStyle={{fontSize: 56, height: 62}}
        style={{
          padding: 0,
          width: 108,
          maxHeight: 62,
          fontSize: 14,
          color: '#262626',
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
    <View style={{marginTop: 12}}>
      <TextInput
        outlineStyle={{fontSize: 12, height: 56}}
        style={{
          padding: 0,
          width: 240,
          maxHeight: 62,
          color: '#262626',
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
    </View>
  ) : (
    <View style={{marginTop: 8}}>
      <TextInput
        outlineStyle={{fontSize: 12, height: 56}}
        style={{
          padding: 0,
          paddingVertical: 0,
          width: 116,
          maxHeight: 62,
          fontSize: 14,
          color: '#262626',
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
    </View>
  );
};

export default ProfileInput;
