import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import {Colors} from '../../constants/colors';

const UserBoardWrap = () => {
  const [mainSelector, setMainSelector] = useState(true);
  const showImageBoard = () => {
    setMainSelector(true);
  };

  const showVideoBoard = () => {
    setMainSelector(false);
  };

  //ContentGetter에다가 값주면 됨
  return (
    <View style={styles.Wrapper}>
      <View style={styles.TabWrapper}>
        <View style={dynamicStyles(mainSelector).TabLeftBox}>
          <Pressable onPress={showImageBoard}>
            <Text style={dynamicStyles(mainSelector).TabTextLeft}> 사진</Text>
          </Pressable>
        </View>
        <View style={dynamicStyles(mainSelector).TabRightBox}>
          <Pressable onPress={showVideoBoard}>
            <Text style={dynamicStyles(mainSelector).TabTextRight}>동영상</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.ContentWrapper}>
        <View style={dynamicStyles(mainSelector).ContentLeftLayout}></View>
        <View style={dynamicStyles(mainSelector).ContentRightLayout}></View>
      </View>
      <View style={styles.ContentGetterLayout}>
        <Text> 하이</Text>
      </View>
    </View>
  );
};

export default UserBoardWrap;

const dynamicStyles = value =>
  StyleSheet.create({
    TabLeftBox: {
      width: '50%',
      height: '99%',
      position: 'absolute',
      left: 0,
      bottom: 0,
      backgroundColor: 'white',
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      zIndex: value ? 2 : 1,
      elevation: value ? 25 : 8,
      justifyContent: 'center',
    },

    TabRightBox: {
      width: '50%',
      height: '99%',
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      zIndex: value ? 1 : 2,
      elevation: value ? 8 : 25,
      justifyContent: 'center',
    },

    ContentLeftLayout: {
      position: 'absolute',
      height: '100%',
      left: 0,
      width: '50%',
      backgroundColor: 'white',
      zIndex: value ? 3 : 1,
      elevation: value ? 0 : 10,
    },
    ContentRightLayout: {
      position: 'absolute',
      borderTopRightRadius: 10,
      height: '100%',
      right: 0,
      width: '50%',
      backgroundColor: 'white',
      zIndex: value ? 1 : 3,
      elevation: value ? 10 : 0,
    },

    TabTextLeft: {
      textAlign: 'center',
      marginBottom: '5%',
      color: value ? 'blue' : 'black',
      fontWeight: value ? 'bold' : 'normal',
    },
    TabTextRight: {
      textAlign: 'center',
      marginBottom: '5%',
      color: value ? 'black' : 'blue',
      fontWeight: value ? 'normal' : 'bold',
    },
  });

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'transparent', // 여백있는지 표시
  },
  TabWrapper: {
    height: '15%',
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: 'white',
  },

  ContentWrapper: {
    width: '100%',
    height: '89%',
    position: 'absolute',
    bottom: 0,
    // backgroundColor: 'red', // 임시
    zIndex: 2,
  },

  ContentGetterLayout: {
    position: 'absolute',
    height: '85%',
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 4,
  },
});
