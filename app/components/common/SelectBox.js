import React, {useState} from 'react';
import {StyleSheet, View, Image, Pressable, Text} from 'react-native';

const SelectBox = ({
  dataSortSelector,
  setDataSortSelector,
  selectParameter,
}) => {
  // 게시판 or 검색창에서 사용 props로 state 내려줘야 함.
  // 게시판에서는 recent or like
  // 검색창에서는 nickname,
  //selectParameter에는 [{id:0,content:~~}] 형식으로
  const [listOpener, setListPOpener] = useState(false);
  console.log(selectParameter);
  // SelectBox 여닫기
  const onListOpenHandler = () => {
    setListPOpener(!listOpener);
  };

  const onDataSelectHandler = () => {
    // setDataSelector(true);
  };

  return (
    <View style={dynamicStyles(listOpener).selectBoxContainer}>
      <Pressable onPress={onListOpenHandler}>
        <View>
          <Text>{selectParameter[dataSortSelector].content}</Text>
        </View>
      </Pressable>
      {listOpener &&
        selectParameter.map(selector => (
          <View key={selector.id}>
            <Pressable onPress={onDataSelectHandler}>
              <Text>{selector.content}</Text>
            </Pressable>
          </View>
        ))}
    </View>
  );
};

export default SelectBox;

const dynamicStyles = value =>
  StyleSheet.create({
    selectBoxContainer: {
      position: 'absolute',
      right: 0,
      padding: '2%',
      // alignItems: 'flex-start',
      width: '100%',
      zIndex: 2,
      backgroundColor: value ? 'gray' : 'transparent',
    },
  });

const styles = StyleSheet.create({
  selectBoxContainer: {
    position: 'absolute',
    right: 0,
    padding: '2%',
    // alignItems: 'flex-start',
    width: '100%',
    zIndex: 2,
    backgroundColor: 'red',
  },
  selectBoxInner: {
    position: 'absolute',
    width: '100%',
  },
});
