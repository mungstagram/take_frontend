import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import TodoList from '../components/todos/TodoList';
import WriteTodo from '../components/todos/WriteTodo';

function Home({navigation}) {
  return (
    <>
      <View style={styles.homeProfile}>
        <Button
          style={styles.goToProfile}
          title="profile page 열기"
          onPress={() => navigation.navigate('Profile')}
        />

        <View style={styles.homeProfileInner}>
          <Text>강아지사진</Text>
          <Text>반려인 사진</Text>
          <Text>강아지 이름</Text>
          <Text>우리가 함께한 날 0000일</Text>
        </View>
      </View>

      <View style={styles.homeTodo}>
        <View style={styles.introduce}>
          <Text>우리 강아지는요</Text>
          <Text>강아지종/나이/몸무게</Text>
        </View>
        <View>
          <WriteTodo />
          <TodoList />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  homeProfile: {
    flex: 1,
    backgroundColor: '#acacac',
  },
  homeProfileInner: {
    borderWidth: 1,
  },
  goToProfile: {
    width: 50,
    height: 50,
  },
  homeTodo: {
    flex: 2,
    backgroundColor: '#949494',
  },
  introduce: {
    height: 100,
    borderWidth: 1,
    backgroundColor: '#b6b6b6',
  },
});

export default Home;
