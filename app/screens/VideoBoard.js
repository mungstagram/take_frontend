import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';

import SelectBox from '../components/common/SelectBox';
import {Colors, BasicColors} from '../constants/colors';
import VideoGetter from '../components/boardcomponent/VideoGetter';
import GoBackButton from '../components/common/GoBackButton';

const VideoBoard = () => {
  // 높이, 너비를 자동으로 업데이트 해준다.
  // const {height, width} = useWindowDimensions();

  //최신순 or 좋아요순 결정하는 state (초깃값을 설정, 서버에 보낼 값을 배열에 담고, 그때의 인덱스)
  const [dataSortSelector, setDataSortSelector] = useState(0);
  //SelectBox에 표시될 이름
  const selectParameter = [
    {id: 0, content: '최신 순으로 보기'},
    {id: 1, content: '인기 순으로 보기'},
  ];
  //아래 배열에 인덱스값(dataSortSelector를 넣어서 어떤 요청할 지 결정! 최신순으로할지, 인기순으로할지)
  const selectDispatchParameter = ['recent', 'likescount'];
  const videoCategory = 'video';
  const dateSortSelectorHandler = selector => {
    setDataSortSelector(selector);
  };

  return (
    <View style={styles.container}>
      <View style={styles.goBackButton}>
        <GoBackButton />
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
      <View style={styles.preCards}>
        <VideoGetter order={selectDispatchParameter[dataSortSelector]} />
      </View>
    </View>
  );
};

export default VideoBoard;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth * 0.9;
//const videoCardHeight = videoCardWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColorDark,
  },
  goBackButton: {
    position: 'absolute',
    height: '7.48%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '7%',
  },
  selectContainer: {
    position: 'absolute',
    top: '8%',
    width: ' 100%',
  },
  selectBoxHolder: {
    position: 'absolute',
    // width: '45%', //  화면의 절반정도로 설정  세부사항은 selecetor에서 설정함
    right: '4%',
    top: '2%',
    zIndex: 8,
    height: 56,
    borderRadius: 4,
    elevation: 5,
    width: '42%', //  화면의 절반정도로 설정  세부사항은 selecetor에서 설정함
  },
  preCards: {
    height: windowHeight * 0.79,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    top: '18%',
  },
});
