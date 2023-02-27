import React from 'react';
import {View, Text, Pressable, FlatList, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';

const SearchNick = ({searchData}) => {
  const navigation = useNavigation();

  const moveToUserDetail = nickname => {
    navigation.push('UserDetail', {nickname});
  };

  return (
    <View>
      <FlatList
        data={searchData}
        renderItem={({item}) => (
          <View style={styles.searchDataWrapper}>
            <View style={styles.searchDataContainer} imageContent={item}>
              <View style={styles.searchTextContainer}>
                <Pressable onPress={() => moveToUserDetail(item.nickname)}>
                  <View>
                    <Text style={styles.searchTextNick}>{item.nickname}</Text>
                  </View>
                  <View>
                    <Text
                      style={styles.searchTextIntro}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {item.introduce}
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View style={styles.profileImgPositioner}>
                <FastImage
                  style={{width: 80, height: 80, backgroundColor: 'gray'}}
                  source={{
                    uri: item.contentUrl.length === 0 ? '' : item.contentUrl[0],
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item.userId}
        horizontal={false}
      />
    </View>
  );
};

export default SearchNick;

const styles = StyleSheet.create({
  searchDataWrapper: {
    alignItems: 'center',
  },
  searchDataContainer: {
    width: '92%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    marginBottom: 12,
    height: 104,
    backgroundColor: 'white',
    elevation: 6,
    flexDirection: 'row',
    paddingHorizontal: '4%',
  },
  searchTextContainer: {
    flexDirection: 'column',
    width: '65%',
    height: '65%',
  },
  searchTextIntro: {
    flexWrap: 'nowrap',
    fontSize: 16,
  },
  searchTextNick: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
