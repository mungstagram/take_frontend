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

import AddCircleGray from '../../components/svg/AddCircleGray';

const AddDogProfile = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.addDogCard}>
          <AddCircleGray />
          <Text style={{marginTop: '4%'}}>저희 집에</Text>
          <Text>댕댕이를 추가할게요!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addDogCard: {
    width: 264,
    height: 444,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    opacity: 0.8,
    borderWidth: 1,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 0.9,
  },
});

export default AddDogProfile;
