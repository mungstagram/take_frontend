import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors, BasicColors} from '../constants/colors';
import MyText from './common/MyText';

const YellowButton = ({children, onPress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.buttonBox}>
        <MyText style={styles.button} onPress={onPress}>
          {children}
        </MyText>
      </TouchableOpacity>
    </View>
  );
};

export default YellowButton;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.92;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
  buttonBox: {
    width: videoCardWidth * 0.475,
    height: 36,
    borderRadius: 4,
    backgroundColor: Colors.mainColorDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    color: BasicColors.whiteColor,
  },
});
