import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import React from 'react';

import AuthInput from '../components/AuthInput';
import Button from '../components/Button';

function Signup() {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text>Login</Text>
      </View>

      <View>
        <AuthInput title="id" />
        <AuthInput title="nickname" />
        <AuthInput title="password" />
        <AuthInput title="password-check" />
      </View>
      <Button>하잉!!</Button>
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  wrapper: {
    // alignItems: 'center',
    backgroundColor: 'black',
    // width: width,
    // flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    flex: 1,
  },
});
