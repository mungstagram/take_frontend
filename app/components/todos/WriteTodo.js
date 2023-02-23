import React, {useState, useEffect} from 'react';
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
    setTodo(e);
  };

  // console.log('되나?', todo);
  const onPressAdd = () => {
    dispatch(__addTodos(todo));
    setTodo('');
  };

  useEffect(() => {}, [todo]);

  return (
    <View style={styles.block}>
      <View>
        <View style={styles.todoInputBlock}>
          <TextInput
            style={styles.textInput}
            placeholder="할 일을 입력하세요"
            onChangeText={addInputHandler}
            value={todo}
          />
          <Button style={styles.saveBtn} title="저장" onPress={onPressAdd} />
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

  todoInputBlock: {
    position: 'relative',
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#9b9b9b',
    flexDirection: 'row',
    left: 20,
  },
  textInput: {
    width: '90%',
    height: 50,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#575757',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveBtn: {
    position: 'absolute',
    zIndex: 1,
  },
});

export default WriteTodo;
