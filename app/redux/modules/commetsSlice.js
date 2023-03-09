import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';
import {Alert} from 'react-native';

const initialState = {
  comments: [],
  detail: {contentUrl: ['']},
  isLoading: false,
  error: null,
};

//comment POST요청
export const __postComment = createAsyncThunk(
  'POST_COMMENT',
  async (payload, thunkAPI) => {
    //console.log('post_pay', payload);
    try {
      const {data} = await http
        .post(`/comments/${payload.postId}`, {
          comment: payload.comment,
          target: payload.target,
        })

        .then(res => {
          //console.log('요청성공');
          Alert.alert('댓글성공');

          return res;
        });
      //console.log('post_data', data);

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      //console.log('요청실패');
      Alert.alert('댓글실패');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//게시물 상세조회 GET/ postsDetail GET
export const __getPostDetailData = createAsyncThunk(
  'GET_POST_DETAIL_DATA',
  async (payload, thunkAPI) => {
    //console.log('GetD', payload);
    try {
      const {data} = await http.get(`/posts/${payload}`);
      //console.log('data', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

//게시물 상세조회 수정 / postsDetail PUT
export const __putPostDetailData = createAsyncThunk(
  'PUT_POST_DETAIL_DATA',
  async (payload, thunkAPI) => {
    //console.log('putD', payload);
    try {
      const {data} = await http.put(`/posts/${payload.postId}`, {
        title: payload.title,
        content: payload.content,
        category: payload.category,
      });
      //console.log('putPostData', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
//댓글 수정 / comments PUT
export const __putComment = createAsyncThunk(
  'PUT_COMMENT',
  async (payload, thunkAPI) => {
    console.log('put', payload);
    try {
      const {data} = await http.put(`/comments/${payload.commentId}`, {
        id: payload.id,
        comment: payload.comment,
      });
      console.log('commentPutData', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

//댓글 삭제 / comments DELETE
export const __deleteComment = createAsyncThunk(
  'DELETE_COMMENT',
  async (payload, thunkAPI) => {
    //console.log('delete', payload.commentId);
    try {
      const {data} = await http.delete(`/comments/${payload.commentId}`);
      //console.log('deletedata', data);
      return thunkAPI.fulfillWithValue(payload.commentId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const commetsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    [__getPostDetailData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPostDetailData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.detail = action.payload;
      state.comments = action.payload.comments;
    },
    [__getPostDetailData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__putPostDetailData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__putPostDetailData.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.detail = action.payload;
      // state.comments = action.payload.comments;
    },
    [__putPostDetailData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 댓글 작성
    [__postComment.pending]: state => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.comments.push(action.payload);
    },
    [__postComment.rejected]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload;
    },
    // 댓글 수정
    [__putComment.pending]: state => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__putComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      const target = state.comments.findIndex(
        comment => comment.id === action.payload,
      );
      //console.log('지고 싶은 대상의 인덱스값', target);
      state.comments.splice(target, 1, action.payload.comment);
      console.log('수정했을때', action.payload.comment);
    },
    [__putComment.rejected]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload;
    },
    // 댓글 삭제
    [__deleteComment.pending]: state => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      const target = state.comments.findIndex(
        comment => comment.id === action.payload,
      );
      //console.log('지고 싶은 대상의 인덱스값', target);
      state.comments.splice(target, 1);
      //console.log('지워졌을때', state.comments);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload;
    },
  },
});

export const {} = commetsSlice.actions;

export default commetsSlice.reducer;
