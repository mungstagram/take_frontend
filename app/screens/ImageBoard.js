import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../constants/colors';
import SelectBox from '../components/common/SelectBox';
import ImageGetter from '../components/boardcomponent/ImageGetter';

const ImageBoard = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <View style={styles.selectBoxHolder}>
          <SelectBox
            dataSortSelector={dataSortSelector}
            dateSortSelectorHandler={dateSortSelectorHandler}
            selectParameter={selectParameter}
          />
        </View>
      </View>
      <View style={styles.preCards}>
        <ImageGetter order={selectDispatchParameter[dataSortSelector]} />
      </View>
    </View>
  );
};

export default ImageBoard;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth - 40;
const videoCardHeight = videoCardWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColorDark,
  },
  selectContainer: {
    position: 'absolute',
    top: '8%',
    // height: '10%',
    width: ' 100%',
    // width: videoCardWidth,
    // alignItems: 'flex-end',
    // top: '2%',
    // left: '4%',
    // zIndex: 10,
  },
  selectBoxHolder: {
    position: 'absolute',
    width: '50%', //  화면의 절반정도로 설정  세부사항은 selecetor에서 설정함
    right: '4%',
    top: '2%',
    zIndex: 8,
    height: 56,
    borderRadius: 4,
    elevation: 5,
    // width: '42%', //  화면의 절반정도로 설정  세부사항은 selecetor에서 설정함
  },
  preCards: {
    height: windowHeight,
    justifyContent: 'center',
    top: '18%',
  },
});
