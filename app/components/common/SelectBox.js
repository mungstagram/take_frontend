import React, {useState} from 'react';
import {StyleSheet, View, Image, Pressable, Text} from 'react-native';

import ArrowDropDown from '../svg/ArrowDropDown';
import ArrowDropUp from '../svg/ArrowDropUp';
import MyText from './MyText';
const SelectBox = ({
  dataSortSelector,
  dateSortSelectorHandler,
  selectParameter,
}) => {
  // 게시판 or 검색창에서 사용 props로 state 내려줘야 함.
  // 게시판에서는 recent or like
  // 검색창에서는 nickname,
  //selectParameter에는 [{id:0,content:~~}] 형식으로
  // 셀렉트 박스의 전체크기는 불러오는 곳에서 결정 (UserBoardWrap의 스타일 참고)

  // SelectBox 여닫는 state (false면 닫힌 상태)
  const [listOpener, setListOpener] = useState(false);
  // SelectBox 여닫기
  const onListOpenHandler = () => {
    setListOpener(!listOpener);
  };

  const onDataSelectHandler = selector => {
    dateSortSelectorHandler(selector.id);
    setListOpener(false);
  };

  return (
    <View style={dynamicStyles(listOpener).selectBoxContainer}>
      <Pressable onPress={onListOpenHandler}>
        <View style={styles.selectOpener}>
          <MyText style={styles.selectBoxText}>
            {selectParameter[dataSortSelector].content}
          </MyText>
          <View style={styles.iconSetter}>
            {!listOpener ? <ArrowDropDown /> : <ArrowDropUp />}
          </View>
        </View>
      </Pressable>
      {listOpener && (
        <View style={styles.selectBoxListContainer}>
          {selectParameter.map(selector => (
            <View key={selector.id}>
              <Pressable
                onPress={() => {
                  onDataSelectHandler(selector);
                }}>
                <MyText style={styles.selectBoxText}>{selector.content}</MyText>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default SelectBox;

const dynamicStyles = value =>
  StyleSheet.create({
    selectBoxContainer: {
      position: 'absolute',
      right: 0,
      width: '100%',
      height: 56,
      zIndex: 2,
      backgroundColor: value ? '#F4F4F4' : 'white',
      borderRadius: 4,
      elevation: value ? 5 : 0,
    },
  });

const styles = StyleSheet.create({
  selectBoxListContainer: {
    width: '100%',
    zIndex: 2,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 10,
  },
  selectBoxText: {
    fontWeight: 'bold',
    paddingLeft: '7%',
    paddingVertical: '7%',
    width: 140,
    fontSize: 14,
  },
  selectOpener: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '4%',
    // backgroundColor: 'green',
  },
  iconSetter: {
    postion: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: 0,
    padding: '7%',
    backgroundColor: 'transparent',
    zIndex: 4,
  },
});
