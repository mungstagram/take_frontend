import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Keyboard,
  TouchableOpacity,
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
      <View style={styles.todoInner}>
        <View style={styles.todoInputBlock}>
          <TextInput
            style={styles.textInput}
            placeholder="우리 아이를 위해 해야 할 일(최대 15자)"
            onChangeText={addInputHandler}
            value={todo}
          />
          <TouchableOpacity
            onPress={onPressAdd}
            style={styles.saveBtn}
            activeOpacity={0.8}
            hitSlop={{top: 32, bottom: 32, left: 32, right: 32}}>
            <Text>저장{'\n'}아이콘</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginTop: 15,
    backgroundColor: '#ffffff',
  },
  todoInner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  todoInputBlock: {
    position: 'relative',
    width: '100%',
    height: 55,
    borderRadius: 3,
    borderColor: '#9b9b9b',
    flexDirection: 'row',
    shadowOpacity: 10,
    shadowRadius: 5.84,
    elevation: 2,
  },

  textInput: {
    width: '99%',
    height: 50,
    borderRadius: 2,
    top: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#575757',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    paddingVertical: 8,
  },

  saveBtn: {
    borderWidth: 1,
    width: 40,
    zIndex: 3,
    position: 'relative',
    margin: 10,
    marginLeft: '80%',
  },
});

export default WriteTodo;
