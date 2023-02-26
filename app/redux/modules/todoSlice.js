import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
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
    // console.log('payload', payload);
    try {
      const data = await http.post('/todos', {content: payload});
      // console.log('data', data);
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

export const __editTodos = createAsyncThunk(
  'EDIT_TODO',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.put(`/todos/${payload.id}`, payload);
      // console.log('edit payload', payload);
      // console.log('edit data', data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const __doneTodos = createAsyncThunk(
  'DONE_TODO',
  async (payload, thunkAPI) => {
    console.log('done payload', payload);
    try {
      const response = await http.patch(`/todos/${payload.id}`, {
        done: payload.done,
      });
      // console.log('done data', data);
      // console.log('done response', response);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      // console.log('done error', error);
      return thunkAPI.rejectWithValue(error.code);
    }
  },
);

export const __deleteTodos = createAsyncThunk(
  'DELETE_TODO',
  async (payload, thunkAPI) => {
    try {
      const {data} = await http.delete(`/todos/${payload}`);
      // console.log('삭제', data);
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
      state.todo.push(action.payload);
    },
    [__addTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
      // console.log('payload', action.payload);
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodos.pending]: state => {
      state.isLoading = true;
    },
    [__editTodos.fulfilled]: (state, action) => {
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
    [__editTodos.pending]: state => {
      state.isLoading = true;
    },
    [__editTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__doneTodos.fulfilled]: (state, action) => {
      // console.log('payload', action.payload);
      //id 가 같지 않은 값을 다시 돌려주기
      // console.log('state.to', state.todos);
      state.isLoading = false;
      const data = state.todo.map(item => {
        return item.id === action.payload.id
          ? {...item, done: action.payload.done}
          : item;
      });
      console.log('state.todo data', data);
      // state.todo = data;
    },
  },
  [__doneTodos.pending]: state => {
    state.isLoading = true;
  },
  [__doneTodos.rejected]: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  [__deleteTodos.fulfilled]: (state, action) => {
    const target = state.todo.findIndex(todo => todo.id === action.payload);
    state.todo.splice(target, 1);
  },
  [__deleteTodos.rejected]: () => {},
  [__deleteTodos.pending]: () => {},
});

export const {toDos} = todoSlice.actions;
export default todoSlice.reducer;
