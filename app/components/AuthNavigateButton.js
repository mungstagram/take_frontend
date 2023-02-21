import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ArrowGoBack from './svg/ArrowGoBack';

const AuthNavigateButton = () => {
  const navigation = useNavigation();
  const navigateStartPageHandler = () => {
    navigation.replace('AuthStartScreen');
  };
  return (
    <View style={styles.textContainer}>
      <Pressable onPress={navigateStartPageHandler}>
        <ArrowGoBack />
      </Pressable>
    </View>
  );
};

export default AuthNavigateButton;

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
  },
});
