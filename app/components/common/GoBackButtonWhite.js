import React, {Children} from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ArrowGoBackWhite from '../svg/ArrowGoBackWhite';

const GoBackButton = () => {
  const navigation = useNavigation();
  const navigateBackPageHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.textContainer}>
      <Pressable onPress={navigateBackPageHandler}>
        <ArrowGoBackWhite />
      </Pressable>
    </View>
  );
};

export default GoBackButton;

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
