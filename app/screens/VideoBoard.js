import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import SelectBox from '../components/common/SelectBox';
import VideoPreviewCard from '../components/videoBoardComp/VideoPreviewCard';

const VideoBoard = () => {
  //최신순 or 좋아요순 결정하는 state (초깃값을 설정, 서버에 보낼 값을 배열에 담고, 그때의 인덱스)
  const [dataSortSelector, setDataSortSelector] = useState(0);
  //SelectBox에 표시될 이름
  const selectParameter = [
    {id: 0, content: '최신순으로 보기'},
    {id: 1, content: '인기순으로 보기'},
  ];
  //아래 배열에 인덱스값(dataSortSelector를 넣어서 어떤 요청할 지 결정! 최신순으로할지, 인기순으로할지)
  const selectDispatchParameter = ['recent', 'likescount'];
  const videoCategory = 'video';
  const dateSortSelectorHandler = selector => {
    setDataSortSelector(selector);
  };

  return (
    <View>
      <View style={styles.selectContainer}>
        <View style={styles.contentGetterLayout}>
          <View style={styles.selectBoxHolder}>
            <SelectBox
              dataSortSelector={dataSortSelector}
              dateSortSelectorHandler={dateSortSelectorHandler}
              selectParameter={selectParameter}
            />
          </View>
        </View>
      </View>
      <View style={styles.preCards}>
        <VideoPreviewCard style={styles.preCard} />
        <VideoPreviewCard style={styles.preCard} />
      </View>
    </View>
  );
};

export default VideoBoard;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoCardWidth = windowWidth - 40;
const videoCardHeight = videoCardWidth * 0.8;

const styles = StyleSheet.create({
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
    top: '2%',
    zIndex: 8,
  },
  preCards: {
    width: videoCardWidth,
    justifyContent: 'center',
  },
  preCard: {marginTop: 10},
});
