import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {__getProfile} from '../redux/modules/profileSlice';

import Logout from '../components/Logout';

import {SwiperFlatList} from 'react-native-swiper-flatlist';

//사람
import PersonProfileCard from '../components/profile/PersonProfileCard';
//강아지
import InputDogProfileCard from '../components/profile/InputDogProfileCard';
import AddDogProfile from '../components/profile/AddDogProfile';

const Profile = ({navigation, route}) => {
  const dispatch = useDispatch();

  const [addDogProf, setAddDogProf] = useState(true);

  const onPressAddDog = () => {
    setAddDogProf(!addDogProf);
  };

  const {myNick} = route.params;
  // console.log('profile nick', myNick);

  useEffect(() => {
    // console.log('왔을까');
    dispatch(__getProfile(myNick));
  }, [myNick]);

  const profile = useSelector(state => state.profile.profile);
  // console.log('stateProfile', profile);
  // console.log('stateProfile user', profile[0].user);

  return (
    <>
      <View style={styles.linkBtn}>
        <Text style={{fontSize: 11, paddingRight: '4%'}}>회원탈퇴</Text>
        <Logout />
      </View>

      <View style={{borderWidth: 2, borderColor: 'blue', top: 10}}>
        <PersonProfileCard myInfo={profile} myNick={myNick} />
      </View>

      <View style={styles.dogBlock}>
        {addDogProf ? (
          <InputDogProfileCard />
        ) : (
          <TouchableOpacity onPress={onPressAddDog}>
            <AddDogProfile />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  linkBtn: {
    flexDirection: 'row',
    left: '35%',
  },
  dogBlock: {
    borderWidth: 3,
    borderColor: 'red',
    flex: 1,
    flexDirection: 'row',
    margin: '8%',
  },
  editBtn: {
    borderWidth: 1,
    width: 40,
    height: 30,
    top: '35%',
    left: '75%',
    zIndex: 2,
  },
});

export default Profile;
