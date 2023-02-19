import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const http = axios.create({
  // baseURL: `${API_URL}`,
  baseURL: `http://f1rstweb.shop`,
  timeout: 100000,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,',
  },
});

http.interceptors.request.use(async function (config) {
  console.log('Api', `${API_URL}`);
  const storedToken = await AsyncStorage.getItem('authorization');

  if (storedToken !== null || storedToken !== undefined) {
    // console.log(access_token);
    // config.headers.common["Authorization"] = `${access_token}`;
    config.headers['Authorization'] = `${storedToken}`;
  }
  return config;
});

export default http;
