import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';
import {Alert} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  addContentLists: [],
  isLoading: false,
  error: null,
};

//AddContent POST요청
export const __postAddContentFormData = createAsyncThunk(
  'POST_ADDCONTENT',
  async (payload, thunkAPI) => {
    try {
      const data = await http
        .post('/posts', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log('요청성공');
          Alert.alert('업로드성공');
          //사진탭을 눌러서 사진을 넣고 완료버튼을 누르면 사진게시판으로 이동하게
          //영상탭을 눌러서 영상 하나 넣고 완료누르면 영상게시판으로 이동

          //유저디테일로 보내는걸로 하기!
          //유저디테일페이지로 넘겨버리자! navigate. sa('/userdetail')

          return res;
        });
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      console.log('요청실패');
      Alert.alert('업로드실패');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//게시글작성
const addContentSlice = createSlice({
  name: 'addContent',
  initialState,
  reducers: {},
  extraReducers: {
    [__postAddContentFormData.pending]: state => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postAddContentFormData.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.lists = action.payload;
      console.log('전송 action.payload', action.payload);
      // 여기에 네비게이트 넣기! 유저디테일페이지로. /유저디테일.{nickName} 검색해보기
    },
    [__postAddContentFormData.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      console.log('전송실패 action.payload', action.payload);
    },
  },
});

export const {} = addContentSlice.actions;
export default addContentSlice.reducer;
