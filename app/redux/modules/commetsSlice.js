import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';
import {Alert} from 'react-native';

const initialState = {
  comment: {},
  isLoading: false,
  error: null,
};

//comment POST요청
export const __postComment = createAsyncThunk(
  'POST_COMMENT',
  async (payload, thunkAPI) => {
    console.log('pay', payload);
    try {
      const data = await http
        .post(`/posts/${payload}`)

        .then(res => {
          //console.log('요청성공');
          Alert.alert('업로드성공');

          return res;
        });
      console.log('data', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      //console.log('요청실패');
      Alert.alert('업로드실패');
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const commetsSlice = createSlice({
  name: 'Comments',
  initialState,
  reducers: {},
  extraReducers: {
    [__postComment.pending]: state => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postComment.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
    },
    [__postComment.rejected]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload;
    },
  },
});

export const {} = commetsSlice.actions;

export default commetsSlice.reducer;
