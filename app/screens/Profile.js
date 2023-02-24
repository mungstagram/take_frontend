import React from 'react';
import {StyleSheet, View, Text, Pressable, Modal} from 'react-native';
import {Button} from 'react-native-paper';

import DogProfileCard from '../components/profile/DogProfileCard';
import PersonProfileCard from '../components/profile/PersonProfileCard';

const Profile = ({navigation}) => {
  console.log('profile');
  return (
    <View>
      <PersonProfileCard />
      <DogProfileCard />
      <Text>하단탭네비 자리</Text>
    </View>
  );
};

export default Profile;
