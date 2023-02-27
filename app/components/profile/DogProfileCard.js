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

const DogProfileCard = () => {
  return (
    <View style={styles.block}>
      <View style={styles.dogCard}>
        <View style={styles.dogImg}>
          <View style={styles.dogImgBtn}></View>

          <View>
            <Text>
              강아지 프로필 사진{'\n'}
              &nbsp;&nbsp;&nbsp;업데이트 하기
            </Text>
          </View>
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
  block: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogCard: {
    width: 280,
    height: 460,
    margin: 10,
    borderRadius: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },

  dogProfileInputWrap: {
    width: 280,
    height: 296,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    bottom: 10,
  },

  dogImg: {
    width: 280,
    height: 170,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dogInputWrapInner: {
    width: 280,
    height: 290,
    justifyContent: 'center',
  },
  dogImgBtn: {
    zIndex: 2,
    position: 'relative',
    bottom: '20%',
    left: '30%',
  },
});

export default DogProfileCard;
