import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

import SelectBox from '../components/common/SelectBox';
import VideoPreviewCard from '../components/videoboardcomp/VideoPreviewCard';
import {Colors, BasicColors} from '../constants/colors';

const VideoBoard = () => {
  // 높이, 너비를 자동으로 업데이트 해준다.
  const {height, width} = useWindowDimensions();

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
//const videoCardHeight = videoCardWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColorDark,
  },
  selectContainer: {
    width: videoCardWidth,
    alignItems: 'flex-end',
    top: '2%',
    left: '4%',
    zIndex: 10,
  },
  selectBoxHolder: {
    width: '42%', //  화면의 절반정도로 설정  세부사항은 selecetor에서 설정함
  },
  preCards: {
    top: '8%',
    alignItems: 'center',
  },
  preCard: {},
});
