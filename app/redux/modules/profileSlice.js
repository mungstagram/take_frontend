import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import http from '../api/http';

const initialState = {
  profile: [
    {
      user: {
        nickname: '',
        contentUrl: '',
        introduce: '',
        dogsCount: '',
      },
    },
    {
      dogs: [],
    },
  ],
  isLoading: false,
  error: null,
};

// Thunk 함수

export const __getHomeProfile = createAsyncThunk(
  'GET_PROFILE_HOME',
  async (payload, thunkAPI) => {
    // console.log('1.home payload', payload);
    //여기서 undefined 면 절대통신이 안된다는 뜻!
    try {
      const {data} = await http.get(`/profile`);
      // console.log('home data', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  },
);

export const __getProfile = createAsyncThunk(
  'GET_PROFILE',
  async (payload, thunkAPI) => {
    console.log('1.payload', payload);
    //여기서 undefined 면 절대통신이 안된다는 뜻!
    try {
      const {data} = await http.get(`/profile/${payload}`);
      console.log('data', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  },
);

export const __editProfile = createAsyncThunk(
  'EDIT_PROFILE',
  async (payload, thunkAPI) => {
    try {
      // console.log('edit payload', payload);
      // console.log('edit payload', payload.nickname);
      // console.log('edit payload', payload.formData);
      const {data} = await http.put(
        `/profile/${payload.nickname}`,
        payload.formData,
        {
          // changeNickname: payload.changeNickname,
          // introduce: payload.introduce,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('resdata', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log('edit error', error);
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const __editDogProfile = createAsyncThunk(
  'EDIT_DOG_PROFILE',
  async (payload, thunkAPI) => {
    try {
      console.log('dog edit payload', payload);
      // console.log('dog edit payload', payload.name);
      // console.log('dog edit payload', payload.formData);
      const {data} = await http.put(
        `/profile/dogs/${payload.id}`,
        payload.formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('dog resdata', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log('edit error', error);
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [__getHomeProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.profile = action.payload;
      // console.log('payload', action.payload);
    },
    [__getHomeProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getHomeProfile.pending]: state => {
      state.isLoading = true;
    },
    [__getProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.profile = action.payload;
      // console.log('payload', action.payload);
    },
    [__getProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getProfile.pending]: state => {
      state.isLoading = true;
    },
    [__editProfile.fulfilled]: (state, action) => {
      state.profile[0].user = action.payload;
      // state.profile[1].dogs = action.payload;
      state.error = null;
    },
    [__editProfile.pending]: state => {
      state.isLoading = true;
    },
    [__editProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__editProfile.fulfilled]: (state, action) => {
      // state.profile[0].user = action.payload;
      state.profile[1].dogs = action.payload;
      state.error = null;
    },
    [__editProfile.pending]: state => {
      state.isLoading = true;
    },
    [__editProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;
