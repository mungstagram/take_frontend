import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import GoBackButton from '../components/common/GoBackButton';
import SelectBox from '../components/common/SelectBox';
import Search from '../components/svg/Search';
import {__getSearchData} from '../redux/modules/searchSlice';
import SearchNick from '../components/userdetail/SearchNick';

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

  const selectDispatchParameter = ['users', 'image', 'video'];
  const refSearch = useRef();

  const {searchData} = useSelector(state => state.searchData);

  const onSearchHandler = () => {
    dispatch(
      __getSearchData({
        search: refSearch.current,
        category: selectDispatchParameter[dataSortSelector],
      }),
    );
  };

  const onChangeRefHandler = e => {
    refSearch.current = e;
  };

  const dateSortSelectorHandler = selector => {
    setDataSortSelector(selector);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.goBackButton}>
        <GoBackButton />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.textBox}>
          <TextInput
            style={styles.textStyle}
            autoCapitalize={false}
            onChangeText={onChangeRefHandler}
            placeholder="검색하기"
          />
          <Pressable onPress={onSearchHandler} style={styles.searchIconBox}>
            <Search />
          </Pressable>
        </View>
        <View style={styles.selectBoxHolder}>
          <SelectBox
            dataSortSelector={dataSortSelector}
            dateSortSelectorHandler={dateSortSelectorHandler}
            selectParameter={selectParameter}
            border
          />
        </View>
      </View>
      <View style={styles.contentPositioner}>
        {dataSortSelector === 0 && <SearchNick searchData={searchData} />}
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
    height: 56,
    borderRadius: 4,
    elevation: 5,
  },
  selectInputHolder: {
    position: 'absolute',
    width: '40%',
    top: '2%',
    height: '100%',
  },
  selectInputBox: {
    position: 'absolute',
    width: '40%', //
    left: '4%',
    top: '2%',
    justifyContent: 'center',
  },
  textBox: {
    position: 'absolute',
    left: '4%',
    width: '47%',
    borderRadius: 4,
    height: 56,
    top: '2%',
    backgroundColor: 'white',
    // justifyContent: 'center',
    flexDirection: 'row',
    elevation: 5,
  },
  textStyle: {fontSize: 14, marginLeft: '3%'},
  searchIconBox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: '5%',
    top: 16,
  },
  contentPositioner: {
    position: 'absolute',
    top: '18%',
    // height: '10%',
    width: ' 100%',
    height: '100%',
  },
});
