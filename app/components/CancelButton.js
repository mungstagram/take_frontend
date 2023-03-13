import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors, BasicColors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import MyText from './common/MyText';

const CancelButton = ({children}) => {
  const navigation = useNavigation();
  const onCancelHandler = () => {
    navigation.navigate('Home');
  };
  return (
    <View>
      <TouchableOpacity style={styles.buttonBox} onPress={onCancelHandler}>
        <MyText style={styles.button}>{children}</MyText>
      </TouchableOpacity>
    </View>
  );
};

export default CancelButton;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.92;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  buttonBox: {
    width: videoCardWidth * 0.475,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.mainColorDark,
    backgroundColor: BasicColors.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
