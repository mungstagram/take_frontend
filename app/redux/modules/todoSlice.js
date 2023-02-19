import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';

const initialState = {
  todo: [],
  error: null,
  isLoading: false,
};

// Thunk 함수

export const __addTodos = createAsyncThunk(
  'ADD_TODO',
  async (payload, thunkAPI) => {
    console.log('payload', payload);
    try {
      const data = await http.post('/todos', payload);
      console.log('data', data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const __getTodos = createAsyncThunk(
  'GET_TODO',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.get('/todos');
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
      http.patch(`/todos/${payload.id}`, payload);
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
      const {data} = await http.delete(`/todos/${payload}`);
      console.log('삭제', data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
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
    [__addTodos.pending]: state => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addTodos.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      // todo:나중에 state에 반영
    },
    [__addTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
      console.log('payload', action.payload);
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
      const target = state.todo.findIndex(todo => todo.id === action.payload);
      state.todo.splice(target, 1);
    },
    [__deleteTodos.rejected]: () => {},
    [__deleteTodos.pending]: () => {},
  },
});

export const {toDos} = todoSlice.actions;
export default todoSlice.reducer;
