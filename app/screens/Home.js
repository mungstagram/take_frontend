import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

function Home({navigation}) {
  return (
    <>
      <View style={styles.homeProfile}>
        <Button
          style={styles.goToProfile}
          title="profile page 열기"
          onPress={() => navigation.navigate('Profile')}
        />
        <Text>강아지사진</Text>
        <Text>반려인 사진</Text>
        <Text>강아지 이름</Text>
        <Text>우리가 함께한 날 000일</Text>
      </View>
      <View>
        {/* {todos.length === 0 ? (
          <Empty />
        ) : (
          <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
        )} */}
        {/* <WriteTodo onInsert={onInsert} /> */}
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
