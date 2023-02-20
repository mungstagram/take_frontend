import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import {Colors} from '../../constants/colors';
import SelectBox from '../common/SelectBox';

const UserBoardWrap = () => {
  // 사진 동영상 중 어떤 페이진지 선택하는 탭
  const [mainSelector, setMainSelector] = useState(true);

  // 사진 선택
  const showImageBoard = () => {
    setMainSelector(true);
  };

  // 동영상 선택
  const showVideoBoard = () => {
    setMainSelector(false);
  };

  // 최신순 or 좋아요 순 결정하는 state (초깃값 설정)
  const [dataSortSelector, setDataSortSelector] = useState(0);
  // SelectBox에 표시될 이름
  const selectParameter = [
    {id: 0, content: '최신순으로 보기'},
    {id: 1, content: '좋아요순으로 보기'},
  ];
  // console.log(selectParameter[0]); // "최신 순으로 보기"
  const dateSortSelectorHandler = selector => {
    setDataSortSelector(selector);
  };

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
        <View style={styles.SelectBoxHolder}>
          <SelectBox
            dataSortSelector={dataSortSelector}
            dateSortSelectorHandler={dateSortSelectorHandler}
            selectParameter={selectParameter}
          />
        </View>
        <Text> 하이</Text>
        <View></View>
      </View>
    </View>
  );
};

export default UserBoardWrap;

// 동적 스타일링
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
      borderTopLeftRadius: value ? 0 : 10,
      backgroundColor: 'white',
      zIndex: value ? 3 : 1,
      elevation: value ? 0 : 10,
    },
    ContentRightLayout: {
      position: 'absolute',
      borderTopRightRadius: value ? 10 : 0,
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
    height: '85%',
    position: 'absolute',
    bottom: 0,
    // backgroundColor: 'red', // 임시
    zIndex: 2,
  },

  ContentGetterLayout: {
    position: 'absolute',
    height: '87%',
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 4,
  },
  SelectBoxHolder: {
    position: 'absolute',
    width: '42%', //  화면의 절반정도로 설정  세부사항은 selecetor에서 설정함
    right: '4%',
    top: '2%',
    zIndex: 4,
  },
});
