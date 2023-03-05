import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  Dimensions,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Surface, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {__postAddContentFormData} from '../../redux/modules/addContentSlice';
import YellowButton from '../YellowButton';
import CancelButton from '../CancelButton';
import {Colors, BasicColors} from '../../constants/colors';

const modifyImage = () => {
  return (
    <SafeAreaView style={styles.containerBox}>
      <View style={styles.box}>
        <View style={styles.textBox}>
          <Surface style={styles.titleInput}>
            <TextInput
              placeholder="제목을 입력하세요(15자 이하)"
              maxLength={15}
              returnKeyType="next"
              multiline={false}
              value={titleText}
              onChange={titleTextHandler}
            />
          </Surface>
          <Surface style={styles.contentInput}>
            <TextInput
              placeholder="내용을 입력하세요(2000자 이하)"
              maxLength={2000}
              multiline={true}
              value={contentText}
              onChange={contentTextHandler}
            />
            <View style={styles.contentCount}>
              <Text>{contentText.length}/2000</Text>
            </View>
          </Surface>
        </View>
        <View style={styles.fileInput}>
          <View style={styles.fileupload}>
            {openCamera && (
              <Pressable style={styles.openPicker} onPress={openPicker}>
                <AddCircle />
              </Pressable>
            )}
            {!openCamera && (
              <Pressable style={styles.openPicker2} onPress={openAgainPicker}>
                <AddCircle />
              </Pressable>
            )}
          </View>

          <FlatList
            style={styles.imagesScreen}
            data={images}
            keyExtractor={(item, index) =>
              (item?.filename ?? item?.path) + index
            }
            renderItem={renderItem}
            horizontal={true}
          />
        </View>
        <View style={styles.buttonRow}>
          <CancelButton onPress={onCancelHandler}>Cancel</CancelButton>
          <YellowButton onPress={onSendFormData}>Done</YellowButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default modifyImage;

const styles = StyleSheet.create({});
