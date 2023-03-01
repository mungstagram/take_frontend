import React, {useEffect} from 'react';
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

//사람
import InputPersonProfileCard from '../components/profile/InputPersonProfileCard';
import PersonProfileCard from '../components/profile/PersonProfileCard';
//강아지
import InputDogProfileCard from '../components/profile/InputDogProfileCard';
import AddDogProfile from '../components/profile/AddDogProfile';
import DogProfile from '../components/profile/DogProfile';

const Profile = ({navigation, route}) => {
  const dispatch = useDispatch();

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
      <View style={{borderWidth: 2, borderColor: 'blue'}}>
        <PersonProfileCard myInfo={profile} />
        {/* <InputPersonProfileCard /> */}
      </View>
      <View style={{borderWidth: 2, borderColor: 'red'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('InputDogProfileCard')}>
          <AddDogProfile />
        </TouchableOpacity>
      </View>

      {/* <InputDogProfileCard /> */}
      {/* <DogProfile /> */}
    </>
  );
};

export default Profile;
