import React, {useState} from 'react';
import {StyleSheet, View, Image, Pressable, Text} from 'react-native';

const SelectBox = ({
  dataSortSelector,
  dateSortSelectorHandler,
  selectParameter,
}) => {
  // 게시판 or 검색창에서 사용 props로 state 내려줘야 함.
  // 게시판에서는 recent or like
  // 검색창에서는 nickname,
  //selectParameter에는 [{id:0,content:~~}] 형식으로
  console.log(selectParameter);

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
        <View>
          <Text style={styles.selectBoxText}>
            {selectParameter[dataSortSelector].content}
          </Text>
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
      //   padding: '2%',
      // alignItems: 'flex-start',
      width: '100%',
      zIndex: 2,
      backgroundColor: value ? 'gray' : 'white',
      borderRadius: 5,
      elevation: value ? 5 : 0,
    },
  });

const styles = StyleSheet.create({
  selectBoxListContainer: {
    // position: 'absolute',
    // right: 0,
    // alignItems: 'flex-start',
    width: '100%',
    zIndex: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
  },
  selectBoxText: {
    fontSize: 15,
    padding: '3%',
  },
});
