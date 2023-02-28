import React from 'react';
import {StyleSheet, View, Text, Pressable, Modal} from 'react-native';
import {Button} from 'react-native-paper';

//사람
import InputPersonProfileCard from '../components/profile/InputPersonProfileCard';
import PersonProfileCard from '../components/profile/PersonProfileCard';
//강아지
import InputDogProfileCard from '../components/profile/InputDogProfileCard';
import AddDogProfile from '../components/profile/AddDogProfile';
import DogProfile from '../components/profile/DogProfile';

const Profile = ({navigation}) => {
  return (
    <>
      <PersonProfileCard />
      {/* <InputPersonProfileCard /> */}
      {/* <AddDogProfile /> */}
      {/* <InputDogProfileCard /> */}
      {/* <DogProfile /> */}
    </>
  );
};

export default Profile;
