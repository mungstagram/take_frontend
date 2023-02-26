import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';

import TodoList from '../components/todos/TodoList';
import WriteTodo from '../components/todos/WriteTodo';

function Home({navigation}) {
  return (
    <>
      <View style={styles.homeProfile}>
        <View style={styles.homeProfileInner}>
          <TouchableOpacity
            style={styles.goToProfileBtn}
            onPress={() => navigation.navigate('Profile')}>
            <Text>열기</Text>
          </TouchableOpacity>

          <View style={styles.profileImg}>
            <View style={styles.dogProfileImg} />
            <View style={styles.personProfileImg} />
          </View>

          <View style={styles.profileInner}>
            <View style={styles.dogNameBox}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'black',
                  textAlign: 'center',
                  top: 5,
                }}>
                강아지 이름
              </Text>
            </View>
            <View style={styles.dDayBox}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  color: '#ffb284',
                  textAlign: 'center',
                  top: 5,
                }}>
                우리가 함께한 날 0000일
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.homeTodoBox}>
          <View style={styles.homeTodoBoxInner}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',

                right: '27%',
              }}>
              강아지종/나이/몸무게
            </Text>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#c9c9c9',
                marginTop: 15,
                width: '95%',
              }}
            />
            <View style={{width: 360}}>
              <WriteTodo />
              <TodoList />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  homeProfile: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffc988',
    justifyContent: 'center',
    alignContent: 'center',
  },

  goToProfileBtn: {
    borderRadius: 50,
    backgroundColor: '#ffffff',
    width: 30,
    height: 30,
    top: 25,
    left: 40,
  },
  homeProfileInner: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImg: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    right: 20,
  },
  dogProfileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    position: 'relative',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  personProfileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    top: 40,
    left: 90,
    zIndex: 2,
    backgroundColor: '#eeeeee',
    position: 'absolute',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileInner: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  dogNameBox: {
    borderRadius: 20,
    width: 120,
    height: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 5,
  },
  dDayBox: {
    borderRadius: 20,
    width: 200,
    height: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    margin: 5,
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 5,
  },

  homeTodoBox: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  homeTodoBoxInner: {
    flex: 1,

    alignItems: 'center',
    margin: '5%',
  },
});

export default Home;
