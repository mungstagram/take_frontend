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
import TaskPinkImg from '../svg/TaskPinkImg';
import ServicesImg from '../svg/ServicesImg';
import Delete from '../svg/Delete';
import CheckBox from '../svg/CheckBox';
import MyText from '../common/MyText';
import ScanDelete from '../svg/ScanDelete';

const Todoitem = ({id, text, done}) => {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  //done 을 가져와서 랜더링만 관리만 하는 거니까 done 만 가져와준다.
  const [isDone, setIsDone] = useState(done);

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
    dispatch(__editTodos({id, content: edit}));
  };

  //1.현재의 done의 반대 값을 넣어주고
  //2. 그 다음에 반대값을 dispatch 넣어준다

  const onPressIsDone = () => {
    setIsDone(!isDone);
    //변화된 값을 바로 보여주지 않는다.
    dispatch(__doneTodos({id, done: !isDone}));
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
      {/* 동적으로 스타일을 바꿔 주고 싶을때는  ...styles 와 삼항연산자 쓰기  */}
      <TouchableOpacity
        onPress={() => {
          onPressIsDone();
          // onPressTodoDone();
        }}
        value={isDone}>
        {isDone ? (
          <View style={styles.checkBoxPositioner}>
            <View style={styles.checkBoxImg}>
              <CheckBox />
            </View>
          </View>
        ) : (
          <View style={styles.checkBoxPositioner}>
            <View style={styles.checkBox} />
          </View>
        )}
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
        <MyText
          style={{
            ...styles.text,
            textDecorationLine: isDone ? 'line-through' : 'none',
          }}>
          {text}
        </MyText>
      )}

      {isEdit ? (
        <TouchableOpacity
          style={styles.utilBtn}
          onPress={() => {
            onPressIsEdit();
            onPressChangeBtn();
            onPressTodoEdit();
          }}>
          <TaskPinkImg />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.utilBtn} onPress={onPressIsEdit}>
          <ServicesImg />
        </TouchableOpacity>
      )}
      {isEdit ? (
        <TouchableOpacity style={styles.utilBtn} onPress={onPressTodoRemove}>
          <ScanDelete brightGray />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.utilBtn} onPress={onPressTodoRemove}>
          <Delete />
        </TouchableOpacity>
      )}
      <View style={styles.removePlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    // borderWidth: 1,
    width: 320,
    height: 56,
    flexDirection: 'row',
    marginTop: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxPositioner: {
    marginRight: '5%',
  },
  checkBox: {
    width: 18,
    height: 18,
    margin: 3,
    // marginRight: '5%',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#e79796',
  },
  checkBoxImg: {
    width: 24,
    height: 24,
    // marginRight: '5%',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    // borderWidth: 1,
    fontSize: 16,
    color: '#000000',
    width: 154,
    height: 24,
  },

  removePlaceholder: {
    // borderWidth: 1,
    width: 32,
    height: 32,
  },
  textInput: {
    fontSize: 16,
    color: '#000000',
    width: 154,
    paddingVertical: 8,
    padding: 0,
    margin: 0,
  },
  utilBtn: {
    width: 24,
    height: 24,
    left: '60%',
    margin: 5,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(Todoitem);
