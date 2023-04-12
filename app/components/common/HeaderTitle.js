import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import {Image} from 'react-native';

const HeaderTitle = ({children}) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../assets/LogoSmall.png')}
          resizeMode={'contain'}
          style={styles.Header}
        />
      </View>
    </>
  );
};

export default HeaderTitle;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.92;

const styles = StyleSheet.create({
  container: {},
  Header: {
    height: 32,
  },
});
