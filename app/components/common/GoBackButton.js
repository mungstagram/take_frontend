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
      <Pressable
        onPress={navigateBackPageHandler}
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
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
