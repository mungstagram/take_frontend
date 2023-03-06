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
const AddDogProfile = ({navigation}) => {
  return (
    <View style={styles.dogBlock}>
      <View style={styles.addDogCard}>
        <TouchableOpacity style={styles.addDogCardText}>
          <Text style={{left: 20}}>플러스아이콘</Text>
          <Text style={{left: 30}}>저희 집에</Text>
          <Text>댕댕이를 추가할게요!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dogBlock: {
    flex: 1,
  },
  addDogCard: {
    width: 264,
    height: 444,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddDogProfile;
