import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const http = axios.create({
  baseURL: 'http://f1rstweb.shop',
  timeout: 100000,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});
// let storedToken;
// async function fetchToken() {
//   const storedToken = await AsyncStorage.getItem('authorization');
//   return storedToken;
// }

http.interceptors.request.use(async function (config) {
  const storedToken = await AsyncStorage.getItem('authorization');
  // console.log(storedToken);
  if (storedToken !== null || storedToken !== undefined) {
    // console.log(access_token);
    // config.headers.common["Authorization"] = `${access_token}`;
    config.headers['Authorization'] = `${storedToken}`;
  }
  return config;
});

export default http;

// // const fetchToken = async () => {
// //   const token = await AsyncStorage.getItem('authorization');
// //   return token;
// // };

// http.interceptors.request.use(async function (config) {
//   await fetchToken();
//   console.log(token);
//   console.log('들어오나');
//   console.log(storedToken);

//   if (storedToken !== null || storedToken !== undefined) {
//     // config.headers.common["Authorization"] = `${access_token}`;
//     config.headers['Authorization'] = `${storedToken}`;
//   }
//   return config;
// });

// export default http;

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useSelector} from 'react-redux';
// let access_token;

// const http = axios.create({
//   baseURL: '서버주소',
//   timeout: 100000,
//   headers: {
//     'content-type': 'application/json;charset=UTF-8',
//     accept: 'application/json,',
//   },
// });
// let storedToken;
// async function fetchToken() {
//   storedToken = await AsyncStorage.getItem('authorization');
//   console.log('stored토큰', storedToken);
//   return storedToken;
// }

// http.interceptors.request.use(async function (config) {
//   await fetchToken()
//   if (storedToken !== null || storedToken !== undefined) {
//     config.headers['Authorization'] = `${storedToken}`;
//   }

//   return config;
// });

// export default http;
