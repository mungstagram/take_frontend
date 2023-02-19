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

// const TodoList = ({todos, onToggle, onRemove}) => {
const TodoList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('되어라 제발');
    dispatch(__getTodos());
  }, [dispatch]);

  const todos = useSelector(state => state.todos.todo);
  console.log('todos', todos);

  return (
    <ScrollView>
      {todos.map(item => (
        <Todoitem
          key={item.id}
          id={item.id}
          text={item.content}
          done={item.done}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    margin: 20,
    backgroundColor: 'gray',
  },
});

export default TodoList;
