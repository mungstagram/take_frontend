import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import http from '../api/http';

const initialState = {
  searchData: [],
  error: null,
  isLoading: false,
};

// Thunk 함수

export const __getSearchData = createAsyncThunk(
  'GET_SEARCH_DATA',
  async (payload, thunkAPI) => {
    console.log(payload, 'search슬라이스');
    try {
      const {data} = await http.get(
        `/searches?search=${payload.search}&category=${payload.category}`,
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const searchSlice = createSlice({
  name: 'searchData',
  initialState,
  reducers: {},
  extraReducers: {
    [__getSearchData.pending]: state => {
      state.isLoading = true;
    },
    [__getSearchData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchData = action.payload;
    },
    [__getSearchData.rejected]: (state, action) => {
      state.isLoading = false;
      //   state.error = action.payload;
    },
  },
});

export const {} = searchSlice.actions;
export default searchSlice.reducer;
