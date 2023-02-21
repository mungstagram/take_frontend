import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const YellowButton = ({children, onPress}) => {
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.buttonBox} onPress={onPress}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default YellowButton;

const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: '#f3c054',
    marginLeft: 20,
    width: 40,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
