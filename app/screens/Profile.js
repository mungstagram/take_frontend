import React from 'react';
import {StyleSheet, View, Text, Pressable, Modal} from 'react-native';
import {Button} from 'react-native-paper';

import Logout from '../components/Logout';

const Profile = () => {
  console.log('profile');
  return (
    <View>
      <Text>profile</Text>
      <Logout />
    </View>
  );
};

export default Profile;
