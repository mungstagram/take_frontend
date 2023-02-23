import React, {useState} from 'react';
import {StyleSheet, View, Image, Pressable, Text} from 'react-native';

import ArrowDropDown from '../svg/ArrowDropDown';
import ArrowDropUp from '../svg/ArrowDropUp';
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

  //   console.log(selectParameter);

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
          <Text style={styles.selectBoxText}>
            {selectParameter[dataSortSelector].content}
          </Text>
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
                <Text style={styles.selectBoxText}>{selector.content}</Text>
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
      zIndex: 2,
      backgroundColor: value ? 'gray' : 'white',
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
    elevation: 5,
  },
  selectBoxText: {
    fontWeight: 'bold',
    padding: '7%',
  },
  selectOpener: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  iconSetter: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: '7%',
    // backgroundColor: 'red',
  },
});
