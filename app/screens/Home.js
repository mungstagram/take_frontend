import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import WriteTodo from '../components/todos/WriteTodo';

function Home({navigation}) {
  // const onInsert = text => {
  //   const nextId =
  //     todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  //   const todo = {
  //     id: nextId,
  //     text,
  //     done: false,
  //   };
  //   setTodos(todos.concat(todo));
  // };

  // const onToggle = id => {
  //   const nextTodos = todos.map(todo =>
  //     todo.id === id ? {...todo, done: !todo.done} : todo,
  //   );
  //   setTodos(nextTodos);
  // };

  // const onRemove = id => {
  //   const nextTodos = todos.filter(todo => todo.id !== id);
  //   setTodos(nextTodos);
  // };

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
        <Text>우리가 함께한 날 000일</Text>
      </View>
      <View>
        {/* {todos.length === 0 ? (
          <Empty />
        ) : (
          <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
        )} */}
        {/* <WriteTodo onInsert={onInsert} /> */}
        <WriteTodo />
      </View>
    </View>
  );
}

export default Home;
