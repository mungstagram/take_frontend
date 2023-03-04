import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import http from '../api/http';

const initialState = {
  profile: [
    {
      dogs: {
        name: '',
        introduce: '',
        species: '',
        gender: '',
        weight: '',
        birthday: '',
        bringDate: '',
      },
    },
  ],
  isLoading: false,
  error: null,
};

// Thunk 함수
export const __addProfile = createAsyncThunk(
  'ADD_PROFILE',
  async (payload, thunkAPI) => {
    // console.log('payload', payload);
    try {
      const data = await http.post('/dogs');
      // console.log('data', data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const __addDogImg = createAsyncThunk(
  'ADD_DOG_IMG',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http
        .post('/dogs', payload.formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log('강아지사진 업로드 성공!');
          return res;
        });
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log('Dog Img upload fail', error);
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const dogProfileSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {},

  extraReducers: {
    [__addDogImg.pending]: state => {
      state.isLoading = true;
    },
    [__addDogImg.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__addDogImg.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addProfile.pending]: state => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addProfile.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.todo.push(action.payload);
    },
    [__addProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = dogProfileSlice.actions;
export default dogProfileSlice.reducer;
