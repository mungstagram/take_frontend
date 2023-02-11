import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CancelButton = ({children}) => {
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.buttonBox}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CancelButton;

const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: '#a4a4a4',
  },
});
