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

import GoBackButton from '../components/common/GoBackButton';

import {SwiperFlatList} from 'react-native-swiper-flatlist';

//사람
import PersonProfileCard from '../components/profile/PersonProfileCard';
//강아지
import InputDogProfileCard from '../components/profile/InputDogProfileCard';
import TextDogProfileCard from '../components/profile/TextDogProfileCard';
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{width: '100%', height: '50%'}}>
          <Text>status bar</Text>
        </View>
        <View style={{width: '100%', height: '50%'}}>
          <View style={styles.linkBtn}>
            <View>
              <GoBackButton />
            </View>
            <View style={{flexDirection: 'row', right: '10%'}}>
              <Text style={{fontSize: 11, paddingRight: '4%'}}>회원탈퇴</Text>
              <Logout />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.top}>
        <View style={{bottom: '15%'}}>
          <PersonProfileCard myInfo={profile} myNick={myNick} />
        </View>
      </View>
      <View style={styles.content} />
      <View style={{left: '8%', bottom: '10%'}}>
        <InputDogProfileCard />
        {/* <TextDogProfileCard /> */}

        {/* <TouchableOpacity onPress={onPressAddDog}>
          <AddDogProfile />
        </TouchableOpacity> */}
      </View>

      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  top: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc988',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  footer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ad657',
  },

  linkBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: '35%',
    top: '4%',
  },

  // editBtn: {
  //   borderWidth: 1,
  //   width: 40,
  //   height: 30,
  //   top: '35%',
  //   left: '75%',
  //   zIndex: 2,
  // },
});

export default Profile;
