import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ArrowGoBack from '../svg/ArrowGoBack';

const GoBackButton = () => {
  const navigation = useNavigation();
  const navigateBackPageHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.textContainer}>
      <Pressable onPress={navigateBackPageHandler}>
        <ArrowGoBack />
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
