import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';

const initialState = {
  userDetail: [],
  error: null,
  isLoading: false,
};

// Thunk 함수

export const __getUserDetail = createAsyncThunk(
  'GET_USER_DETAIL',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.get(`/users/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
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
  },
});

export const {} = userDetailSlice.actions;
export default userDetailSlice.reducer;
