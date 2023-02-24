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
                  fontSize: 15,
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
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: 'black',
              marginTop: 15,
              marginLeft: 10,
              left: 15,
            }}>
            강아지종/나이/몸무게
          </Text>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#cdcdcd',
              width: 380,
              left: 10,
              margin: 10,
            }}
          />
          <View>
            <WriteTodo />
            <TodoList />
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
  },
  personProfileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    top: 50,
    left: 80,
    zIndex: 2,
    backgroundColor: '#eeeeee',
    position: 'absolute',
  },
  profileInner: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  dogNameBox: {
    borderRadius: 20,
    width: 100,
    height: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  dDayBox: {
    borderRadius: 20,
    width: 200,
    height: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    margin: 5,
  },

  homeTodoBox: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default Home;
