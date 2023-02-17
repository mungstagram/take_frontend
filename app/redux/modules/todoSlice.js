import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import http from '../api/http';

const initialState = {
  todos: {
    id: 0,
    content: '',
  },
  error: null,
  isLoading: false,
};

//Thunk 함수

export const __addTodos = createAsyncThunk(
  'ADD_TODO',
  async (payload, thunkAPI) => {
    try {
      const {data} = await axios.post('/todos');
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const __getTodos = createAsyncThunk(
  'GET_TODO',
  async (payload, thunkAPI) => {
    try {
      const {data} = await axios.get('/todos');
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  },
);

export const __updateTodos = createAsyncThunk(
  'UPDATE_TODO',
  async (payload, thunkAPI) => {
    try {
      axios.patch(`/todos/${payload.id}`, payload);
      console.log(payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const __deleteTodos = createAsyncThunk(
  'DELETE_TODO',
  async (payload, thunkAPI) => {
    try {
      const {data} = await axios.delete(`/todos/${payload}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  },
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    clearTodo: state => {
      state.todo = {
        id: 0,
        content: '',
      };
    },
  },
  extraReducers: {
    [__addTodos.pending]: state => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addTodos.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.todos.push(action.payload);
    },
    [__addTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodos.pending]: state => {
      state.isLoading = true;
    },
    [__updateTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__updateTodos.pending]: state => {
      state.isLoading = true;
    },
    [__updateTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodos.fulfilled]: (state, action) => {
      const target = state.todos.findIndex(
        comment => comment.id === action.payload,
      );
      state.todos.splice(target, 1);
    },
    [__deleteTodos.rejected]: () => {},
    [__deleteTodos.pending]: () => {},
  },
});

export const {toDos} = todoSlice.actions;
export default todoSlice.reducer;
