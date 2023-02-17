import React, {useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {__getTodos} from '../../redux/modules/todoSlice';

import Todoitem from './Todoitem';

// const TodoList = ({todos, onToggle, onRemove}) => {
const TodoList = () => {
  const dispatch = useDispatch();
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
      data={todos}
      renderItem={({item}) => (
        <Todoitem
          id={item.id}
          text={item.text}
          done={item.done}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
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
