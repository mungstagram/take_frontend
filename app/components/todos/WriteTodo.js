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

  const [todo, setTodo] = useState('');

  const addInputHandler = e => {
    // console.log('e.nativeEvent.text', e.nativeEvent.text);
    setTodo(e);
  };

  console.log('되나?', todo);
  const onPressAdd = () => {
    dispatch(__addTodos(todo));
    setTodo('');
  };

  return (
    <View style={styles.block}>
      <View>
        <View style={styles.editBlock}>
          <Text>우리 강아지에게 해줘야해요</Text>
        </View>
        <View style={styles.todoInputBlock}>
          <TextInput
            placeholder="할 일을 입력하세요"
            onChangeText={addInputHandler}
            value={todo}
          />

          <Button title="저장" onPress={onPressAdd} />
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
  todoInputBlock: {
    borderWidth: 1,
    padding: 10,
    borderColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WriteTodo;
