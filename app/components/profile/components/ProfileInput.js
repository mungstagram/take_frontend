import React from 'react';
import {TextInput} from 'react-native-paper';

const ProfileInput = ({label, long}) => {
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
    />
  );
};

export default ProfileInput;
