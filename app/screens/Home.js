import React from 'react';
import {StyleSheet, View, Text, Pressable, Modal, Button} from 'react-native';

function Home({navigation}) {
  return (
    <View>
      <View>
        <Text>유저이미지</Text>
        <Text>댕댕이프로필사진 누면 프로필 페이지</Text>
        <Button
          title="profile page 열기"
          onPress={() => navigation.navigate('Profile')}
        />
        <Text>My name</Text>
        <Text>디데이 기능구현</Text>
      </View>
      <View>
        <View>
          <Text>강아지정보</Text>
        </View>
        <View>
          <Text>할일리스트 기능구현</Text>
        </View>
      </View>
    </View>
  );
}

export default Home;
