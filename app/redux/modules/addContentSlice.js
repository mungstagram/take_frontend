import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';
import {Alert} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

//초기상태
const initialState = {
  contentList: [],
  isLoading: false,
  error: null,
};

//게시물 작성
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

// 게시물 조회
export const __getPostData = createAsyncThunk(
  'GET_POST_DATA',
  async (payload, thunkAPI) => {
    //payload에서는 객체형식으로  {order :  ,category : }  가 있어야함.

    try {
      const {data} = await http.get(
        payload.nickname
          ? `/posts?order=${payload.order}&category=${payload.category}&nickname=${payload.nickname}`
          : `/posts?order=${payload.order}&category=${payload.category}`,
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

//게시물 삭제
export const __deletePostDetailData = createAsyncThunk(
  'DELETE_POST_DETAIL_DATA',
  async (payload, thunkAPI) => {
    console.log('payload', payload);
    try {
      const {data} = await http.delete(`/posts/${payload.postId}`);

      console.log('deleteData', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

//게시물 좋아요
export const __putLikes = createAsyncThunk(
  'PUT_LIKES',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.put(`/posts/likes/${payload.postId}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

//게시글작성 // 리듀서
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
      // 여기에 네비게이트 넣기! 유저디테일페이지로. /유저디테일.{nickName} 검색해보기
    },
    [__postAddContentFormData.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
      //console.log('전송실패 action.payload', action.payload);
    },
    [__getPostData.pending]: state => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getPostData.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.contentList = action.payload;
    },
    [__getPostData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const {} = addContentSlice.actions;
export default addContentSlice.reducer;
