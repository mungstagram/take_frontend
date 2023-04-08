import React, {Children} from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ArrowGoBackWhite from '../svg/ArrowGoBackWhite';

const GoBackButtonWhite = () => {
  const navigation = useNavigation();
  const navigateBackPageHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.textContainer}>
      <Pressable
        onPress={navigateBackPageHandler}
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
        <ArrowGoBackWhite />
      </Pressable>
    </View>
  );
};

export default GoBackButtonWhite;

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
