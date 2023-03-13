import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';
import {Alert} from 'react-native';

//초기상태
const initialState = {
  contentList: [],
  isLoading: false,
  isAdding: false,
  error: null,
  isWrittenNavigator: '',
};

//게시물 작성
export const __postAddContentFormData = createAsyncThunk(
  'POST_ADDCONTENT',
  async (payload, thunkAPI) => {
    //console.log('paylod', payload);
    try {
      const data = await http
        .post('/posts', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          Alert.alert('게시글 작성을 완료하였습니다.');

          return res;
        });
      // console.log(data, '작성시받는값');
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      //console.log('요청실패');
      Alert.alert('게시글 작성에 실패하였습니다.');
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
    //console.log('payload', payload);
    try {
      const {data} = await http.delete(`/posts/${payload.postId}`);
      Alert.alert('귀여운 댕댕이사진이 지워졌습니다😭');
      console.log('deleteData', payload.postId);
      return thunkAPI.fulfillWithValue(payload.postId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

//게시물 좋아요
export const __putLikes = createAsyncThunk(
  'PUT_LIKES',
  async (payload, thunkAPI) => {
    //console.log('likepay', payload.postId);
    try {
      const {data} = await http.put(`/posts/likes/${payload.postId}`);
      //console.log('likeData', data);
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
  reducers: {
    resetNavigator: (state, action) => {
      state.isWrittenNavigator = '';
    },
  },
  extraReducers: {
    [__postAddContentFormData.pending]: state => {
      state.isAdding = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postAddContentFormData.fulfilled]: (state, action) => {
      state.isAdding = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.isWrittenNavigator = action.payload.category;
      // 여기에 네비게이트 넣기! 유저디테일페이지로. /유저디테일.{nickName} 검색해보기
    },
    [__postAddContentFormData.rejected]: (state, action) => {
      state.isAdding = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
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
    [__deletePostDetailData.pending]: state => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__deletePostDetailData.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      const target = state.addContent.findIndex(
        content => content.id === action.payload,
      );
      state.addContent.splice(target, 1);
    },
    [__deletePostDetailData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const {resetNavigator} = addContentSlice.actions;
export default addContentSlice.reducer;
