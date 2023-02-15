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
// response:  [{"bucketId": -1739773001, "chooseModel": 0, "duration": 1214, "fileName": "20230216_005335.mp4", "height": 1080, "localIdentifier": 1000008322, "mime": "video/mp4", "parentFolderName": "Camera", "path": "content://media/external/video/media/1000008322", "position": 0, "realPath": "/storage/emulated/0/DCIM/Camera/20230216_005335.mp4", "size": 3308327, "thumbnail": "", "type": "video", "width": 1920}]

// const AddVideo = () => {
//   const [videos, setVideos] = useState([]);
//   // 사진넣기 버튼 클릭시 작동하는 이벤트
//   const openPicker = async () => {
//     try {
//       const response = await MultipleImagePicker.openPicker({
//         usedCameraButton: false,
//         maxVideo: 5,
//         selectedAssets: videos,
//         isExportThumbnail: true,
//         isCrop: true,
//         isCropCircle: true,
//       });

//       console.log('response: ', response);
//     } catch (e) {
//       console.log(e.code, e.message);
//     }
//   };
//   //remove 라는 이름을 많이 쓴다고 한다.

//   const onDelete = value => {
//     const data = videos.filter(
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
//       <View style={styles.videoView}>
//         <Image
//           width={VIDEO_WIDTH}
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
//             data={videos}
//             keyExtractor={(item, index) =>
//               (item?.filename ?? item?.path) + index
//             }
//             renderItem={renderItem}
//             numColumns={3}
//           />
//           <View>
//             <TouchableOpacity style={styles.openPicker} onPress={openPicker}>
//               <Text style={styles.openText}>댕댕🐶 영상올리기</Text>
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

// export default AddVideo;

// const {width} = Dimensions.get('window');

// const VIDEO_WIDTH = (width - 24) / 3;

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
//   videoView: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingVertical: 24,
//   },
//   media: {
//     marginLeft: 6,
//     width: VIDEO_WIDTH,
//     height: VIDEO_WIDTH,
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
