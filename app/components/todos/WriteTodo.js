import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {__addTodos} from '../../redux/modules/todoSlice';

const WriteTodo = () => {
  const dispatch = useDispatch();
  const addTodoRef = useRef();

  const onChangeAddRefHandler = e => {
    addTodoRef.current = e;
  };

  const onPress = e => {
    console.log('onPress 안에', addTodoRef.current);
    dispatch(
      __addTodos({
        content: addTodoRef.current,
      }),
    );
  };
  // console.log('add to do에', addTodoRef);

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="할 일을 입력하세요"
        style={styles.todoInput}
        onChangeText={onChangeAddRefHandler}
      />

      <View style={styles.todoBtn}>
        <Button title="저장" onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    margin: 10,
    backgroundColor: 'gray',
    alignItems: 'center',
    flexDirection: 'row',
  },
  todoInput: {
    flex: 3,
    fontSize: 15,
    margin: 5,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  todoBtn: {
    flex: 1,
    width: 50,
    height: 50,
    backgroundColor: '#c0c0c0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WriteTodo;
