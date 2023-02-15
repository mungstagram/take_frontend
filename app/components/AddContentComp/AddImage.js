// import React, {useState} from 'react';
// import {
//   Dimensions,
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   TextInput,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';

// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

// import YellowButton from '../components/YellowButton';
// import CancelButton from '../components/CancelButton';
// response:  [{"bucketId": -1313584517, "chooseModel": 0, "duration": 0, "fileName": "Screenshot_20230216-004304_PupFluencer.jpg", "height": 2400, "localIdentifier": 1000008321, "mime": "image/jpeg", "parentFolderName": "Screenshots", "path": "content://media/external/images/media/1000008321", "position": 1, "realPath": "/storage/emulated/0/DCIM/Screenshots/Screenshot_20230216-004304_PupFluencer.jpg", "size": 95202, "type": "image", "width": 1080}]

// const AddImage = () => {
//   const [images, setImages] = useState([]);
//   // 사진넣기 버튼 클릭시 작동하는 이벤트
//   const openPicker = async () => {
//     try {
//       const response = await MultipleImagePicker.openPicker({
//         usedCameraButton: false,
//         maxVideo: 5,
//         selectedAssets: images, //videos
//         isExportThumbnail: true,
//         isCrop: true,
//         isCropCircle: true,
//       });

//       console.log('response: ', response);
//       setImages(response);
//     } catch (e) {
//       console.log(e.code, e.message);
//     }
//   };
//   //remove 라는 이름을 많이 쓴다고 한다.

//   const onDelete = value => {
//     const data = images.filter(
//       item =>
//         item?.localIdentifier &&
//         item?.localIdentifier !== value?.localIdentifier,
//     );
//     setImages(data);
//   };
//   // 사진 출력
//   //출력되는 사진들에 각각 삭제버튼을 만들어 줌.
//   const renderItem = ({item, index}) => {
//     return (
//       <View style={styles.imageView}>
//         <Image
//           width={IMAGE_WIDTH}
//           source={{
//             uri:
//               item?.type === 'video'
//                 ? item?.thumbnail ?? ''
//                 : 'file://' + (item?.crop?.cropPath ?? item.path),
//           }}
//           style={styles.media}
//         />
//         <TouchableOpacity
//           onPress={() => onDelete(item)}
//           activeOpacity={0.9}
//           style={styles.buttonDelete}>
//           <Text style={styles.titleDelete}>X</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.containerBox}>
//       <View style={styles.box}>
//         <View style={styles.container}>
//           <View style={styles.titleInput}>
//             <TextInput placeholder="제목을 입력하세요" />
//           </View>
//           <View style={styles.contentInput}>
//             <TextInput placeholder="제목을 입력하세요" />
//           </View>
//           <View>
//             <Text>0/600</Text>
//           </View>
//           <View style={styles.imageInput}>
//             <TextInput placeholder="제목을 입력하세요" />
//           </View>

//           <FlatList
//             data={images}
//             keyExtractor={(item, index) =>
//               (item?.filename ?? item?.path) + index
//             }
//             renderItem={renderItem}
//             numColumns={3}
//           />
//           <View>
//             <TouchableOpacity style={styles.openPicker} onPress={openPicker}>
//               <Text style={styles.openText}>댕댕🐶 사진넣기</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.buttonRow}>
//             <CancelButton>Cancel</CancelButton>
//             <YellowButton>Done</YellowButton>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default AddImage;

// const {width} = Dimensions.get('window');

// const IMAGE_WIDTH = (width - 24) / 3;

// const styles = StyleSheet.create({
//   containerBox: {
//     flex: 1,
//   },
//   box: {
//     flex: 1,
//     backgroundColor: '#e6e6e6',
//     alignContent: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//   },
//   titleInput: {
//     flex: 1,
//     border: 1,
//     borderColor: '#ffac53',
//   },
//   contentInput: {
//     flex: 3,
//   },
//   imageInput: {
//     flex: 2,
//   },
//   buttonRow: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   openText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#fff',
//     paddingVertical: 12,
//   },
//   openPicker: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   imageView: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingVertical: 24,
//   },
//   media: {
//     marginLeft: 6,
//     width: IMAGE_WIDTH,
//     height: IMAGE_WIDTH,
//     marginBottom: 6,
//     backgroundColor: 'rgba(0,0,0,0.2)',
//   },
//   buttonDelete: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     position: 'absolute',
//     top: 6,
//     right: 6,
//     backgroundColor: '#ffffff92',
//     borderRadius: 4,
//   },
//   titleDelete: {
//     fontWeight: 'bold',
//     fontSize: 12,
//     color: '#000',
//   },
// });
