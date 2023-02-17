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

// const Todoitem = ({id, text, done, onToggle, onRemove}) => {
const Todoitem = () => {
  // const remove = () => {
  //   Alert.alert(
  //     '삭제하시겠어요?',
  //     '정말로 삭제하시겠어요~?',
  //     [
  //       {text: '취소', onPress: () => {}, style: 'cancel'},
  //       {
  //         text: '삭제',
  //         onPress: () => {
  //           onRemove(id);
  //         },
  //         style: 'destructive',
  //       },
  //     ],
  //     {
  //       cancelable: true,
  //       onDismiss: () => {},
  //     },
  //   );
  // };
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onToggle(id)}>
        <View style={[styles.circle, done && styles.filled]} />
      </TouchableOpacity>

      <Text style={[styles.text, done && styles.lineThrough]}>{text}</Text>

      {done ? (
        // <TouchableOpacity onPress={() => onRemove(id)}>
        <Button title="삭제" style={styles.removeBtn} />
      ) : (
        // </TouchableOpacity>
        <View style={styles.removePlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 12,
    borderColor: '#gray',
    borderWidth: 1,
    marginRight: 16,
  },
  filled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ae3333',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#gray',
  },

  lineThrough: {
    color: 'blue',
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
