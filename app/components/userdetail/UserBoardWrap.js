import {relative} from 'path';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';

const UserBoardWrap = () => {
  return (
    <View style={styles.Wrapper}>
      <View style={styles.TabWrapper}></View>
      <View style={styles.ContentWrapper}></View>
    </View>
  );
};

export default UserBoardWrap;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: 'green', // 여백있는지 표시
  },
  TabWrapper: {
    height: '15%',
    width: '100%',

    position: 'absolute',
    top: 0,
    backgroundColor: 'red',
  },
  ContentWrapper: {
    width: '100%',
    height: '90%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'gray',
    zIndex: 4,
  },
});

// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Colors} from '../../constants/colors';

// const UserBoardWrap = () => {
//   return (
//     <View style={styles.Wrapper}>
//       <View style={styles.Container2}></View>
//       <View style={styles.Container1}>
//         <View style={styles.TabContainer}>
//           <Text> 가나다</Text>
//         </View>
//         <View style={styles.TabContainerBehind}>
//           <Text> 가나다</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default UserBoardWrap;

// const styles = StyleSheet.create({
//   Wrapper: {
//     flex: 1,
//     backgroundColor: 'green', // 여백있는지 표시
//     // marginTop: 10,
//     flexDirection: 'column-reverse',
//   },
//   Wrapper2: {
//     flex: 1,
//     backgroundColor: 'blue',
//   },
//   TextStyle: {
//     fontSize: 16,
//   },
//   Container1: {
//     flex: 0.1,
//     // : ,
//     // width: 20,
//     backgroundColor: 'red',
//     flexDirection: 'row',
//     // alignItems: 'center',
//     alignItems: 'stretch',
//   },
//   Container2: {
//     flex: 1.2,
//     backgroundColor: 'white',
//     elevation: 8,
//   },
//   TabContainer: {
//     alignItems: 'center',
//     flex: 1,
//     // borderRadius: 20,
//     backgroundColor: 'white',
//     // borderTopEndRadius: 60,
//     // borderTopStartRadius: 60,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     elevation: 8,
//     borderBottomWidth: 0,
//   },
//   TabContainerBehind: {
//     alignItems: 'center',
//     flex: 1,
//     // borderRadius: 20,
//     backgroundColor: 'white',
//     // borderTopEndRadius: 60,
//     // borderTopStartRadius: 60,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     elevation: 2,
//   },
// });
