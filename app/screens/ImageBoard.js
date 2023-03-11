import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {KeyboardAvoidingView} from 'react-native';
import {useLongPress} from 'react-native-use-gesture';

import {Colors, BasicColors} from '../constants/colors';
import SelectBox from '../components/common/SelectBox';
import ImageGetter from '../components/boardcomponent/ImageGetter';
import GoBackButtonWhite from '../components/common/GoBackButtonWhite';
import HeaderTitle from '../components/common/HeaderTitle';
import MyText from '../components/common/MyText';

const ImageBoard = () => {
  //바텀텝의 높이
  const tabBarHeight = useBottomTabBarHeight();
  // 최신순 or 좋아요 순 결정하는 state (초깃값 설정 서버에 보낼 값을 배열에 담고, 그때의 인덱스)
  const [dataSortSelector, setDataSortSelector] = useState(0);
  // SelectBox에 표시될 이름
  const selectParameter = [
    {id: 0, content: '최신 순으로 보기'},
    {id: 1, content: '인기 순으로 보기'},
  ];
  useEffect(() => {
    setDataSortSelector(0);
  }, []);

  // 아래 배열에 인덱스값(dataSortSelector를 넣어서 어떤 요청할 지 결정(최신순, 좋아요순))
  const selectDispatchParameter = ['recent', 'likescount'];

  const dateSortSelectorHandler = selector => {
    setDataSortSelector(selector);
  };

  const onClickBtn = () => {
    navigation.navigate;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.goBackButton}>
          <GoBackButtonWhite />
        </View>
        <View style={styles.headerTitle}>
          <HeaderTitle />
          <Text style={styles.title}>사진 갤러리</Text>
        </View>
        <View style={styles.flex2}></View>
      </View>
      <View style={styles.selectContainer}>
        <View style={styles.selectBoxHolder}>
          <SelectBox
            dataSortSelector={dataSortSelector}
            dateSortSelectorHandler={dateSortSelectorHandler}
            selectParameter={selectParameter}
          />
        </View>
      </View>
      <View style={{height: headHeight - tabBarHeight, top: '10%'}}>
        <View style={styles.preCards} onLongPress={onClickBtn}>
          <ImageGetter order={selectDispatchParameter[dataSortSelector]} />
        </View>
      </View>
    </View>
  );
};

export default ImageBoard;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.92;

//위에서부터 셀렉트박스까지 높이
const headHeight = windowHeight - 114;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColorDark,
  },
  headerBox: {
    width: videoCardWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goBackButton: {
    height: 58,
    alignItems: 'flex-start',
    marginLeft: '7%',
    paddingTop: 18,
    zIndex: 20,
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    width: videoCardWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  title: {
    marginHorizontal: videoCardWidth * 0.05,
    fontSize: 28,
    color: BasicColors.whiteColor,
    fontFamily: 'SBAggro-M',
    top: 3,
  },
  flex2: {
    flex: 1,
  },
  selectContainer: {
    position: 'absolute',
    top: '8%',
    width: ' 100%',
  },
  selectBoxHolder: {
    position: 'absolute',
    right: '4%',
    top: '2%',
    zIndex: 8,
    height: 56,
    borderRadius: 4,
    elevation: 5,
    width: '42%', //  화면의 절반정도로 설정  세부사항은 selecetor에서 설정함
  },
  preCards: {
    height: '96%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
