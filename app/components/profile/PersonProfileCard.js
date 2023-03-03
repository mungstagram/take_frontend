import React, {useEffect, useState} from 'react';
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
import FastImage from 'react-native-fast-image';

import {__getProfile, __editProfile} from '../../redux/modules/profileSlice';

import Logout from '../Logout';
import AddProfileImg from './AddProfileImg';

const PersonProfileCard = () => {
  // const PersonProfileCard = ({myInfo}) => {
  //   console.log('user myNick', myInfo[0].user);
  const dispatch = useDispatch();

  const profile = useSelector(state => state.profile.profile);
  // console.log('input profile', profile[0]);
  //input
  const [profNickEdit, setProfNickEdit] = useState(profile[0].user.nickname);
  const [profIntroEdit, setProfIntroEdit] = useState(profile[0].user.introduce);
  const [isEdit, setIsEdit] = useState(false);

  const onPressInputEdit = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    // console.log('data를 가져오자');
    //2.데이터 값을 초기에 실행(마운트될때, 안에 있는 함수을 실행)
    dispatch(__getProfile());
    //3. dispatch get 프로필 정보 요청
    // console.log('2.2.user', nickname);
    // console.log('person profile');
  }, []);

  // console.log('state.profile', profile[0]);
  // console.log('user dog', myInfo[1].dogs);
  // console.log('contentUrl', myInfo[0].user.contentUrl);
  //input 폼 데이터
  // const formData = new FormData();

  // const sendEditFormData = () => {
  //   const objProfile = {
  //     nickname: profile[0].user.nickname,
  //     changeNickname: profNickEdit,
  //     introduce: profIntroEdit,
  //   };

  //   for (let key in objProfile) {
  //     formData.append(key, objProfile[key]);
  //     formData.append('files', {
  //       name: images[0].fileName,
  //       type: images[0].mime,
  //       uri: `file://${images[0].realPath}`,
  //     });
  //   }

  //   console.log('edit profile');
  //   dispatch(__editProfile(formData));
  //   console.log('objProfile', objProfile);
  // };

  const onPresschangeNickEdit = e => {
    setProfNickEdit(e);
  };
  // console.log('input profile profNickEdit', profNickEdit);

  const onPresschangeProfEdit = e => {
    setProfIntroEdit(e);
  };
  // console.log('input profile profIntroEdit', profIntroEdit);

  return (
    <View style={styles.block}>
      <View style={styles.card}>
        <View style={styles.cardLeftWrap}>
          <View style={styles.imgOpenBtn}>
            <FastImage
              style={styles.personImg}
              source={{
                uri: profile[0].user.contentUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          <Text
            style={{
              fontSize: 12,
              color: 'white',
              zIndex: 2,
              marginTop: '12%',
            }}>
            {profile[0].user.dogsCount} 마리의 집사
          </Text>
        </View>

        <View style={styles.cardRightWrap}>
          <View style={styles.textInputWrap}>
            <View>
              {isEdit ? (
                <TextInput
                  style={{left: 10}}
                  placeholder="Nick Name"
                  onChangeText={onPresschangeNickEdit}
                  value={profNickEdit}
                  autoFocus
                />
              ) : (
                <Text style={{fontSize: 20, color: 'white', fontWeight: '600'}}>
                  {profile[0].user.nickname}
                </Text>
              )}
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={onPressInputEdit}>
              <Text>수정</Text>
            </TouchableOpacity>
          </View>
          <View>
            {isEdit ? (
              <TextInput
                placeholder="성격, 산책 시간, 거주지 소개"
                maxLength={25}
                style={styles.textInputIntro}
                multiline={true}
                value={profIntroEdit}
                onChangeText={onPresschangeProfEdit}
              />
            ) : (
              <Text style={{fontSize: 16, color: 'white'}}>
                {profile[0].user.introduce}
              </Text>
            )}
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
  card: {
    // borderWidth: 5,
    // borderColor: 'red',
    width: 320,
    height: 132,
    flexDirection: 'row',
  },
  cardLeftWrap: {
    // borderWidth: 3,
    // borderColor: 'blue',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRightWrap: {
    // borderWidth: 3,
    // borderColor: 'green',
    width: 190,
    left: '16%',
    padding: '4%',
  },
  editBtn: {
    borderWidth: 1,
    // width: 24,
    width: 30,
    height: 24,
    zIndex: 1,
  },

  textInputWrap: {
    // borderWidth: 1,
    // borderColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textInputBtn: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    left: '55%',
    top: '12%',
    position: 'absolute',
  },
  personImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    top: '10%',
    left: '15%',
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  imgOpenBtn: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    right: '10%',
  },
});

export default PersonProfileCard;
