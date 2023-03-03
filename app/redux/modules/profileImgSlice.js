import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';
import {Alert} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  profile: [],
  isLoading: false,
  error: null,
};

export const __addProfileImgFormData = createAsyncThunk(
  'ADD_PROFILE_IMG',
  async (payload, thunkAPI) => {
    try {
      const data = await http
        .post(`/profile/${payload}`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          //console.log('요청성공');
          Alert.alert('업로드성공');
          //사진탭을 눌러서 사진을 넣고 완료버튼을 누르면 사진게시판으로 이동하게
          //영상탭을 눌러서 영상 하나 넣고 완료누르면 영상게시판으로 이동

          //유저디테일로 보내는걸로 하기!
          //유저디테일페이지로 넘겨버리자! navigate. sa('/userdetail')

          return res;
        });
      return thunkAPI.fulfillWithValue();
    } catch (error) {
      //console.log('요청실패');
      Alert.alert('업로드실패');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const profileImgSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [__addProfileImgFormData.pending]: state => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__addProfileImgFormData.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      // state.lists = action.payload;
      //console.log('전송 action.payload', action.payload);
    },
    [__addProfileImgFormData.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      //console.log('전송실패 action.payload', action.payload);
    },
  },
});

export const {} = profileImgSlice.actions;
export default profileImgSlice.reducer;
