import React, {useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {__deleteTodos, __editTodos} from '../../redux/modules/todoSlice';

const Todoitem = ({id, text, done}) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const todos = useSelector(state => state.todos.todo);
  console.log('todos', todos);

  const onPressIsEdit = () => {
    setIsEdit(true);
  };

  const onPressChangeBtn = () => {
    setIsEdit(false);
  };

  const onPressChangeEdit = e => {
    setEdit(e);
  };

  const onPressTodoEdit = () => {
    console.log('edit', edit);
    // dispatch(__editTodos({id, done: isEdit, content: edit}));
    dispatch(__editTodos({id, content: edit}));
  };

  const onPressTodoRemove = () => {
    Alert.alert(
      '할 일 삭제',
      '정말로 삭제하시겠어요~?',
      [
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            dispatch(__deleteTodos(id));
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity>
        <View style={[styles.checkBox, done && styles.filled]} />
      </TouchableOpacity>

      {isEdit ? (
        <TextInput
          style={styles.textInput}
          value={edit}
          onChangeText={onPressChangeEdit}
        />
      ) : (
        <Text style={[styles.text, done && styles.lineThrough]}>{text}</Text>
      )}
      <Button
        title="삭제"
        style={styles.removeBtn}
        onPress={onPressTodoRemove}
      />
      {isEdit ? (
        <Button
          title="완료"
          onPress={() => {
            onPressIsEdit();
            onPressChangeBtn();
            onPressTodoEdit();
          }}
        />
      ) : (
        <Button title="수정" onPress={onPressIsEdit} />
      )}
      <View style={styles.removePlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderColor: '#gray',
    borderWidth: 1,
    marginRight: 16,
  },
  filled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  text: {
    fontSize: 16,
    color: '#000000',
    width: '55%',
  },

  lineThrough: {
    color: '#000000',
    textDecorationLine: 'line-through',
  },
  removePlaceholder: {
    width: 32,
    height: 32,
  },
  removeBtn: {
    width: 20,
    height: 20,
  },
  textInput: {
    width: '55%',
  },
});

export default Todoitem;
