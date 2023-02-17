import React from 'react';
import {StyleSheet, View, Text, Pressable, Modal, Button} from 'react-native';

function Home({navigation}) {
  return (
    <View>
      <View>
        <Button
          title="profile page 열기"
          onPress={() => navigation.navigate('Profile')}
        />

        <Text>강아지사진</Text>
        <Text>반려인 사진</Text>
        <Text>강아지 이름</Text>
        <Text>우리가 함께한 날 0000일</Text>
      </View>
      <View></View>
    </View>
  );
}

export default Home;
