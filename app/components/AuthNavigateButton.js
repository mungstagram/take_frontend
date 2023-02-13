import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AuthNavigateButton = ({isLoginpage}) => {
  const navigation = useNavigation();
  function switchAuthModeHandler() {
    if (isLoginpage) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }
  return (
    <View style={styles.textContainer}>
      <Pressable onPress={switchAuthModeHandler}>
        <Text style={styles.navigateText}>
          {isLoginpage ? 'Create a new user' : 'Log in instead'}
        </Text>
      </Pressable>
    </View>
  );
};

export default AuthNavigateButton;

const styles = StyleSheet.create({
  textContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  navigateText: {
    fontSize: 12,
    color: 'white',
  },
});
