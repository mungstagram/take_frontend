import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyText from './MyText';
import {Colors} from '../../constants/colors';
import {ActivityIndicator} from 'react-native-paper';

const LoadingModal = ({modalHandler, writting}) => {
  return (
    <>
      {writting ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={Boolean(modalHandler)}>
          <View style={styles.centeredWrittenView}>
            <View style={styles.modalView}>
              <ActivityIndicator color={Colors.pointColorDark} size={40} />
              <MyText style={styles.modalText}>작성중...</MyText>
            </View>
          </View>
        </Modal>
      ) : (
        <Modal
          animationType="fade"
          transparent={true}
          visible={Boolean(modalHandler)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator color={Colors.pointColorDark} size={40} />
              <MyText style={styles.modalText}>로딩중...</MyText>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.84)',
  },
  centeredWrittenView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  modalText: {
    marginTop: 4,
    opacity: 1,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 20,
    color: Colors.pointColorDark,
  },
});
