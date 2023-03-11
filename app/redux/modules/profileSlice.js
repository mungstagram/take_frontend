import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  myProfile: [
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
  nicknameChanged: false,
};

// Thunk 함수

export const __getHomeProfile = createAsyncThunk(
  'GET_PROFILE_HOME',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.get(`/profile`);
      // console.log('home data', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.code);
    }
  },
);

export const __getProfile = createAsyncThunk(
  'GET_PROFILE',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.get(`/profile/${payload}`);
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
      const {data} = await http.put(
        `/profile/${payload.nickname}`,
        payload.formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      AsyncStorage.setItem('nickname', data.nickname);

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      Alert.alert('죄송합니다 수정에 실패하였습니다.');
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const __addDogProfile = createAsyncThunk(
  'ADD_DOG_PROFILE',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.post(`/dogs`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log('dog add data', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log('add error', error);
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const __editDogProfile = createAsyncThunk(
  'EDIT_DOG_PROFILE',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.put(
        `/profile/dogs/${payload.id}`,
        payload.formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log('edit error', error);
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const __deleteDogProfile = createAsyncThunk(
  'DELETE_DOG_PROFILE',
  async (payload, thunkAPI) => {
    console.log(payload, '삭제 페이로드');
    try {
      const {data} = await http.delete('/dogs', {data: payload});
      console.log(data, '삭제 응답');
      return thunkAPI.fulfillWithValue(payload.id);
    } catch (error) {
      console.log('edit error', error);
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    nickNotChanged: (state, action) => {
      state.nicknameChanged = false;
    },
  },
  extraReducers: {
    [__getHomeProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action.payload);
      state.myProfile = action.payload;
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
      state.profile = action.payload;
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
      state.myProfile[0].user = action.payload;
      state.nicknameChanged = true;
      state.error = null;
    },
    [__editProfile.pending]: state => {
      state.isLoading = true;
    },
    [__editProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //강아지
    [__editDogProfile.fulfilled]: (state, action) => {
      state.profile[1].dogs = action.payload.dogs;
      state.error = null;
    },
    [__editDogProfile.pending]: state => {
      state.isLoading = true;
    },
    [__editDogProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addDogProfile.fulfilled]: (state, action) => {
      state.profile[1].dogs.push(action.payload);
      state.error = null;
    },
    [__addDogProfile.pending]: state => {
      state.isLoading = true;
    },
    [__addDogProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteDogProfile.fulfilled]: (state, action) => {
      const target = state.profile[1].dogs.findIndex(
        dog => dog.id === action.payload,
      );
      state.profile[1].dogs.splice(target, 1);
      state.error = null;
    },
    [__deleteDogProfile.pending]: state => {
      state.isLoading = true;
    },
    [__deleteDogProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {nickNotChanged} = profileSlice.actions;
export default profileSlice.reducer;
