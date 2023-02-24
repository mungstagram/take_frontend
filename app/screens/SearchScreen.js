import React, {useState} from 'react';
import {View, Text, Pressable, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import UserDetail from './UserDetail';
import GoBackButton from '../components/common/GoBackButton';
import SelectBox from '../components/common/SelectBox';

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //샐랙트 박스 파라미터 설정
  // 유저닉네임, 사진 동영상 요청 데이터 결정하는 state (초깃값 설정 서버에 보낼 값을 배열에 담고, 그때의 인덱스)
  const [dataSortSelector, setDataSortSelector] = useState(0);
  // SelectBox에 표시될 이름
  const selectParameter = [
    {id: 0, content: '유저 닉네임'},
    {id: 1, content: '사진'},
    {id: 2, content: '동영상'},
  ];

  // 아래 배열에 인덱스값(dataSortSelector를 넣어서 어떤 요청할 지 결정(최신순, 좋아요순))
  // const selectDispatchParameter = ['recent', 'likescount'];

  const dateSortSelectorHandler = selector => {
    setDataSortSelector(selector);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.goBackButton}>
        <GoBackButton />
      </View>

      {/* <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('UserDetail', {
            nickname: 'Seeder1',
          });
        }}
      /> */}
      <View style={styles.inputContainer}>
        <View>
          <Text>SearchScreen</Text>
        </View>
        <View style={styles.selectBoxHolder}>
          <SelectBox
            dataSortSelector={dataSortSelector}
            dateSortSelectorHandler={dateSortSelectorHandler}
            selectParameter={selectParameter}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
  },
  goBackButton: {
    position: 'absolute',
    height: '7.48%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: '7%',
  },
  inputContainer: {
    position: 'absolute',
    top: '8%',
    // height: '10%',
    width: ' 100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectBoxHolder: {
    position: 'absolute',
    width: '40%', //  화면의 절반정도로 설정  세부사항은 selecetor에서 설정함
    right: '4%',
    top: '2%',
    zIndex: 8,
    // height: 43,
    backgroundColor: 'red',
  },
  selectInputBox: {
    position: 'absolute',
    width: '40%', //  화면의 절반정도로 설정  세부사항은 selecetor에서 설정함
    left: '4%',
    top: '2%',
  },
});
