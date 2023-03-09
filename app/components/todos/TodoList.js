import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Keyboard,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {__getTodos} from '../../redux/modules/todoSlice';

import Todoitem from './Todoitem';
import MyText from '../common/MyText';

// const TodoList = ({todos, onToggle, onRemove}) => {
const TodoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('되어라 제발');
    dispatch(__getTodos());
  }, [dispatch]);

  const todos = useSelector(state => state.todos.todo);
  // console.log('todos', todos);

  return (
    <View style={styles.todoListWrap}>
      <ScrollView>
        {todos
          ?.map(item => (
            <Todoitem
              key={item.id}
              id={item.id}
              text={item.content}
              done={item.done}
            />
          ))
          .reverse()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  todoListWrap: {
    // borderWidth: 1,
    width: 320,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
  },
});

export default TodoList;
