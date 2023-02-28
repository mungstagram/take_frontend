import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import http from '../api/http';

const initialState = {
  profile: [],
  isLoading: false,
  error: null,
};

// Thunk 함수

export const __getProfile = createAsyncThunk(
  'GET_PROFILE',
  async (payload, thunkAPI) => {
    console.log('3.get payload', payload);
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
      const {data} = await http.put(`/profile/${payload.id}`, payload);
      // console.log('edit payload', payload);
      // console.log('edit data', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // clearTodo: state => {
    //   state.todo = {
    //     id: 0,
    //     content: '',
    //   };
    // },
  },
  extraReducers: {
    [__getProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
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
      state.isLoading = false;
      // console.log('payload', action.payload);
      // const data = state.todo.filter(todo => todo.id !== action.payload);
      const target = state.todo.findIndex(
        todo => todo.id === action.payload.id,
      );
      state.todo.splice(target, 1, action.payload);
      // console.log('state.to', state.todo);
      // state.todo = action.payload;
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

export const {toDos} = todoSlice.actions;
export default todoSlice.reducer;
