import React from 'react';
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
import {useDispatch} from 'react-redux';
import {__deleteTodos} from '../../redux/modules/todoSlice';

const Todoitem = ({id, text, done}) => {
  const dispatch = useDispatch();

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

  // const onToggleStatusTodo = id => {
  //   dispatch(toggleStatusTodo(id));
  // };

  return (
    <View style={styles.item}>
      <TouchableOpacity>
        <View style={[styles.checkBox, done && styles.filled]} />
      </TouchableOpacity>

      <Text style={[styles.text, done && styles.lineThrough]}>{text}</Text>

      <Button
        title="삭제"
        style={styles.removeBtn}
        onPress={onPressTodoRemove}
      />

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
    flex: 1,
    fontSize: 16,
    color: '##000000',
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
});

export default Todoitem;
