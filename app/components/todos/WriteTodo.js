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

  // const onReset = () => {
  //   addTodoRef({
  //     content: '',
  //   });
  //   addTodoRef.current.focus();
  // };

  console.log('add to do에', addTodoRef);

  return (
    <View style={styles.block}>
      <View>
        <View style={styles.editBlock}>
          <Text>우리 강아지에게 해줘야해요</Text>
          <Button title="수정" />
        </View>
        <TextInput
          placeholder="할 일을 입력하세요"
          style={styles.todoInput}
          onChangeText={onChangeAddRefHandler}
        />
        <View style={styles.todoBtn}>
          <Button title="저장" onPress={onPress} />
          {/* <Button
          title="저장"
          onPress={() => {
            onPress();
            onReset();
          }}
        /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    margin: 10,
    backgroundColor: '#ffffff',
  },
  editBlock: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  todoInput: {
    borderWidth: 1,
    borderColor: '#000000',
    height: 20,
    flex: 3,
    fontSize: 15,
    margin: 20,
    paddingVertical: 8,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
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
