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
  const todoInput = useRef('');

  // const [text, setText] = useState('');

  const onPress = e => {
    dispatch(
      __addTodos({
        todos: todoInput.current,
      }),
    );
    // onInsert(text);
    // setText('');
    // Keyboard.dismiss();
  };
  console.log(todoInput);

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="할 일을 입력하세요"
        refInput={todoInput}
        style={styles.todoInput}
        // value={text}
        // onChangeText={setText}
        // onSubmitEditing={onPress}
        // returnKeyType="done"
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
