import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

import GoBackButtonWhite from '../components/common/GoBackButtonWhite';
import SelectBox from '../components/common/SelectBox';
import Search from '../components/svg/Search';
import {__getSearchData} from '../redux/modules/searchSlice';
import SearchNick from '../components/userdetail/SearchNick';
import SearchNone from '../components/userdetail/SearchNone';
import ImageGetter from '../components/boardcomponent/ImageGetter';
import VideoGetter from '../components/boardcomponent/VideoGetter';
import MyText from '../components/common/MyText';

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  //검색을 했는지 안했는지
  const [startSearch, setStartSearch] = useState(false);
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
  // 검색창 내용
  const refSearch = useRef();
  // 검색된 데이터 내용을 받기
  const {searchData} = useSelector(state => state.searchData);
  const {category} = useSelector(state => state.searchData);

  useEffect(() => {
    if (isFocused) {
      setStartSearch(false);
    }
  }, [isFocused, dataSortSelector]);

  const onSearchHandler = () => {
    dispatch(
      __getSearchData({
        search: refSearch.current,
        category: selectDispatchParameter[dataSortSelector],
      }),
    );
    setStartSearch(true);
  };
  const onChangeRefHandler = e => {
    refSearch.current = e;
  };

  const dateSortSelectorHandler = selector => {
    setDataSortSelector(selector);
  };
  //검색값이 없을때, 보여지는 컴퍼넌트

  return (
    <ImageBackground
      source={require('../assets/pupfluencerBackGround.png')}
      resizeMode={'cover'}
      style={{width: '100%'}}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.buttonAligner}>
            <GoBackButtonWhite />
          </View>
          <View style={styles.logoAligner}>
            <Image
              source={require('../assets/LogoSmall.png')}
              resizeMode={'cover'}
              style={styles.headImage}
            />
            <Text style={styles.logoText}>찾아보기</Text>
          </View>
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
          {searchData.length === 0 && startSearch && <SearchNone />}
          {category === 'users' && searchData.length !== 0 && startSearch && (
            <SearchNick searchData={searchData} />
          )}
          {category === 'image' && searchData.length !== 0 && startSearch && (
            <ImageGetter searchData={searchData} />
          )}
          {category === 'video' && searchData.length !== 0 && startSearch && (
            <VideoGetter searchData={searchData} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
  },
  header: {
    marginTop: 12,
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: '7%',
    alignItems: 'center',
    width: '100%',
  },
  buttonAligner: {
    alignItems: 'flex-start',
    width: 24,
  },
  logoAligner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 24,
    flex: 1,
  },
  headImage: {
    marginRight: 20,
  },
  logoText: {
    lineHeight: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 28,
    fontFamily: 'SBAggro-M',
    color: 'white',
    top: 3,
  },
  inputContainer: {
    // backgroundColor: 'blue',
    marginTop: 20,
    // height: '10%',
    width: ' 100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
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
    zIndex: 20,
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
  textStyle: {
    fontSize: 14,
    marginLeft: '3%',
    width: '80%',
  },
  searchIconBox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: '5%',
    top: 16,
    backgroundColor: 'white',
  },
  contentPositioner: {
    marginTop: 16,
    // height: '10%',
    width: ' 100%',
    height: '100%',
    alignItems: 'center',
  },
});
