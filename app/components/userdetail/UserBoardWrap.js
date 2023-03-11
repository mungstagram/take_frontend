import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import {Colors} from '../../constants/colors';
import SelectBox from '../common/SelectBox';
import ImageGetter from '../boardcomponent/ImageGetter';
import VideoGetter from '../boardcomponent/VideoGetter';
import MyText from '../common/MyText';
const UserBoardWrap = ({nickname}) => {
  console.log(nickname, '유저보드랩마운트되면 닉네임임');
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

  // 최신순 or 좋아요 순 결정하는 state (초깃값 설정 서버에 보낼 값을 배열에 담고, 그때의 인덱스)
  const [dataSortSelector, setDataSortSelector] = useState(0);
  // SelectBox에 표시될 이름
  const selectParameter = [
    {id: 0, content: '최신 순으로 보기'},
    {id: 1, content: '인기 순으로 보기'},
  ];

  // 아래 배열에 인덱스값(dataSortSelector를 넣어서 어떤 요청할 지 결정(최신순, 좋아요순))
  const selectDispatchParameter = ['recent', 'likescount'];

  const dateSortSelectorHandler = selector => {
    setDataSortSelector(selector);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabWrapper}>
        <View style={dynamicStyles(mainSelector).tabLeftBox}>
          <Pressable onPress={showImageBoard}>
            <MyText style={dynamicStyles(mainSelector).tabTextLeft}>
              사진
            </MyText>
          </Pressable>
        </View>
        <View style={dynamicStyles(mainSelector).tabRightBox}>
          <Pressable onPress={showVideoBoard}>
            <MyText style={dynamicStyles(mainSelector).tabTextRight}>
              동영상
            </MyText>
          </Pressable>
        </View>
      </View>
      <View style={styles.contentWrapper}>
        <View style={dynamicStyles(mainSelector).contentLeftLayout}></View>
        <View style={dynamicStyles(mainSelector).contentRightLayout}></View>
      </View>
      <View style={styles.contentGetterLayout}>
        <View style={styles.selectBoxHolder}>
          <SelectBox
            dataSortSelector={dataSortSelector}
            dateSortSelectorHandler={dateSortSelectorHandler}
            selectParameter={selectParameter}
          />
        </View>
        <View style={styles.dataGetterWrapper}>
          {mainSelector ? (
            <ImageGetter
              order={selectDispatchParameter[dataSortSelector]}
              nickname={nickname}></ImageGetter>
          ) : (
            <View style={{alignItems: 'center'}}>
              <VideoGetter
                order={selectDispatchParameter[dataSortSelector]}
                nickname={nickname}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserBoardWrap;

// 동적 스타일링
const dynamicStyles = value =>
  StyleSheet.create({
    tabLeftBox: {
      width: '50%',
      height: '99%',
      position: 'absolute',
      left: 0,
      bottom: 0,
      backgroundColor: 'white',
      borderTopStartRadius: 12,
      borderTopEndRadius: 12,
      zIndex: value ? 2 : 1,
      elevation: value ? 25 : 8,
      justifyContent: 'center',
      zIndex: 2,
    },

    tabRightBox: {
      width: '50%',
      height: '99%',
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
      borderTopStartRadius: 12,
      borderTopEndRadius: 12,
      zIndex: value ? 1 : 2,
      elevation: value ? 8 : 25,
      justifyContent: 'center',
    },

    contentLeftLayout: {
      position: 'absolute',
      height: '100%',
      left: 0,
      width: '50%',
      borderTopLeftRadius: value ? 0 : 12,
      backgroundColor: 'white',
      zIndex: value ? 3 : 1,
      elevation: value ? 0 : 10,
    },
    contentRightLayout: {
      position: 'absolute',
      borderTopRightRadius: value ? 12 : 0,
      height: '100%',
      right: 0,
      width: '50%',
      backgroundColor: 'white',
      zIndex: value ? 1 : 3,
      elevation: value ? 10 : 0,
    },

    tabTextLeft: {
      textAlign: 'center',
      marginBottom: '5%',
      color: value ? 'blue' : 'black',
      fontWeight: value ? 'bold' : 'normal',
    },
    tabTextRight: {
      textAlign: 'center',
      marginBottom: '5%',
      color: value ? 'black' : 'blue',
      fontWeight: value ? 'normal' : 'bold',
    },
  });

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabWrapper: {
    height: '15%',
    width: '100%',
    position: 'absolute',
    top: 0,
    backgroundColor: Colors.mainColorBright,
  },

  contentWrapper: {
    width: '100%',
    height: '89%',
    position: 'absolute',
    bottom: 0,
    // backgroundColor: 'red', // 임시
    zIndex: 2,
  },

  contentGetterLayout: {
    position: 'absolute',
    height: '86%',
    width: '100%',
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 4,
  },
  selectBoxHolder: {
    position: 'absolute',
    width: '42%', //  화면의 절반정도로 설정  세부사항은 selecetor에서 설정함
    right: '4%',
    top: '0%',
    zIndex: 8,
  },
  dataGetterWrapper: {
    position: 'absolute',
    bottom: 0,
    height: '87%',
    width: '100%',
    zIndex: 5,
    // backgroundColor: 'red',
  },
});
