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

const InputDogProfileCard = () => {
  return (
    <View style={styles.dogBlock}>
      <View style={styles.dogCardShadow} />
      <View style={styles.dogCard}>
        <TouchableOpacity style={styles.saveBtn}>
          <Text>저장</Text>
        </TouchableOpacity>
        <View style={styles.dogImg}>
          <View style={styles.dogImgBtn} />
        </View>

        <View style={styles.dogProfileInputWrap}>
          <View style={styles.dogInputWrapInner}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                margin: 5,
                paddingTop: 8,
              }}>
              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  left: '15%',
                  // borderWidth: 1,
                  backgroundColor: '#ffffff',
                }}>
                강아지이름
              </Text>
              <TextInput
                style={{
                  position: 'relative',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'gray',
                  width: '45%',
                  height: 50,
                  left: 5,
                }}
                placeholder="김댕댕"
              />
              <Text
                style={{
                  borderColor: 'gray',
                  width: '40%',
                  height: 50,
                  textAlign: 'center',
                }}>
                대표강아지
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                margin: 5,
                paddingTop: 8,
              }}>
              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  left: '15%',
                  // borderWidth: 1,
                  backgroundColor: '#ffffff',
                }}>
                종류
              </Text>
              <TextInput
                style={{
                  position: 'relative',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'gray',
                  width: '40%',
                  height: 50,
                }}
                placeholder="요크셔테리어"
              />
              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  right: '25%',
                  // borderWidth: 1,
                  backgroundColor: '#ffffff',
                }}>
                몸무게
              </Text>

              <TextInput
                style={{
                  position: 'relative',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'gray',
                  width: '40%',
                  height: 50,
                }}
                placeholder="00kg"
              />
            </View>

            <View
              style={{
                margin: 5,
                alignItems: 'center',
                paddingTop: 8,
              }}>
              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  left: '15%',
                  // borderWidth: 1,
                  backgroundColor: '#ffffff',
                }}>
                강아지소개
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'gray',
                  width: '85%',
                  height: 50,
                }}
                placeholder="집사바라기"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                margin: 5,
                paddingTop: 8,
              }}>
              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  left: '12%',
                  backgroundColor: '#ffffff',
                }}>
                태어난 날
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'gray',
                  width: '40%',
                  height: 50,
                }}
                placeholder="00.00.00"
              />
              <Text
                style={{
                  color: 'black',
                  zIndex: 2,
                  position: 'absolute',
                  fontSize: 13,
                  top: 0,
                  right: '20%',
                  backgroundColor: '#ffffff',
                }}>
                데려온 날
              </Text>
              <TextInput
                style={{
                  position: 'relative',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'gray',
                  width: '40%',
                  height: 50,
                }}
                placeholder="00.00.00"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dogBlock: {
    flex: 1,
  },

  dogCard: {
    width: 264,
    height: 444,
    borderRadius: 15,
    position: 'absolute',
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogCardShadow: {
    width: 264,
    height: 440,
    borderRadius: 15,
    top: '10%',
    shadowOpacity: 0.9,
    shadowRadius: 15,
    elevation: 5,
  },

  dogProfileInputWrap: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    bottom: 10,
  },

  dogImg: {
    width: 264,
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  dogInputWrapInner: {
    width: 264,
    height: 284,
    justifyContent: 'center',
  },
  dogImgBtn: {
    zIndex: 2,
    position: 'relative',
    bottom: '20%',
    left: '30%',
  },
  saveBtn: {
    width: 30,
    height: 24,
    borderWidth: 1,
    zIndex: 2,
    position: 'relative',
    top: '10%',
  },
});

export default InputDogProfileCard;
