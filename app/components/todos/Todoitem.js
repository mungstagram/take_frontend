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
import {
  __deleteTodos,
  __editTodos,
  __doneTodos,
} from '../../redux/modules/todoSlice';

const Todoitem = ({id, text, done}) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState();
  const [isEdit, setIsEdit] = useState(false);

  //done 을 가져와서 랜더링만 관리만 하는 거니까 done 만 가져와준다.
  const [isDone, setIsDone] = useState(done);

  const todos = useSelector(state => state.todos.todo);
  console.log('todos', todos);
  // console.log('todos done', todos.done);

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
    // console.log('edit', edit);
    // dispatch(__editTodos({id, done: isEdit, content: edit}));
    dispatch(__editTodos({id, content: edit}));
  };

  //1.현재의 done의 반대 값을 넣어주고
  //2. 그 다음에 반대값을 dispatch 넣어준다

  const onPressIsDone = () => {
    setIsDone(!isDone);
    //변화된 값을 바로 보여주지 않는다.
    dispatch(__doneTodos({id, done: !isDone}));
  };
  console.log('isDone', isDone);
  //바깥에서 출력해야 볼 수 있다.

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
      {/* 동적으로 스타일을 바꿔 주고 싶을때는  ...styles 와 삼항연산자 쓰기  */}
      <TouchableOpacity
        onPress={() => {
          onPressIsDone();
          // onPressTodoDone();
        }}
        style={{
          ...styles.checkBox,
          backgroundColor: isDone ? '#e79796' : 'white',
        }}
        value={isDone}>
        <View />
      </TouchableOpacity>

      {isEdit ? (
        <TextInput
          style={styles.textInput}
          maxLength={15}
          value={edit}
          onChangeText={onPressChangeEdit}
          autoFocus
        />
      ) : (
        <Text style={[styles.text, done && styles.lineThrough]}>{text}</Text>
      )}
      <TouchableOpacity style={styles.utilBtn} onPress={onPressTodoRemove}>
        <Text>삭제</Text>
      </TouchableOpacity>

      {isEdit ? (
        <TouchableOpacity
          style={styles.utilBtn}
          onPress={() => {
            onPressIsEdit();
            onPressChangeBtn();
            onPressTodoEdit();
          }}>
          <Text>완료</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.utilBtn} onPress={onPressIsEdit}>
          <Text>수정</Text>
        </TouchableOpacity>
      )}
      <View style={styles.removePlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#e79796',
  },

  text: {
    fontSize: 16,
    color: '#000000',
    width: 180,
    height: 30,
    top: 5,
  },

  removePlaceholder: {
    width: 32,
    height: 32,
  },
  textInput: {
    fontSize: 16,
    color: '#000000',
    width: 180,
    height: 40,
    paddingVertical: 8,
  },
  utilBtn: {
    borderWidth: 1,
    width: 30,
    height: 20,
    left: '80%',
    margin: 5,
    zIndex: 2,
  },
});

export default Todoitem;
