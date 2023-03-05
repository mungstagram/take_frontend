import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';

const initialState = {
  userDetail: [],
  error: null,
  isLoading: false,
  targetRoomId: '',
};

// Thunk 함수

export const __getUserDetail = createAsyncThunk(
  'GET_USER_DETAIL',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.get(`/users/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      console.log('get과정에 생긴 에러', e);

      return thunkAPI.rejectWithValue(e.code);
    }
  },
);
export const __getRoomId = createAsyncThunk(
  'GET_ROOM_ID',
  async (payload, thunkAPI) => {
    //상대방의 닉네임이 들어옴
    try {
      const {data} = await http.post('/dms', payload);
      // console.log(data, '서버의응답');
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.code);
    }
  },
);

export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {},
  extraReducers: {
    [__getUserDetail.pending]: state => {
      state.isLoading = true;
    },
    [__getUserDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userDetail = action.payload;
    },
    [__getUserDetail.rejected]: (state, action) => {
      state.isLoading = false;
      //   state.error = action.payload;
    },
    [__getRoomId.pending]: state => {
      state.isLoading = true;
    },
    [__getRoomId.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log('성공시 들어오는가', action.payload.roomId);
      state.targetRoomId = action.payload.roomId;
    },
    [__getRoomId.rejected]: (state, action) => {
      state.isLoading = false;
      //   state.error = action.payload;
    },
  },
});

export const {} = userDetailSlice.actions;
export default userDetailSlice.reducer;
