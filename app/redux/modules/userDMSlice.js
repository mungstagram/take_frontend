import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  userDM: [],
  error: null,
  isLoading: false,
};

export const userDMSLice = createSlice({
  name: 'userDM',
  initialState,
  reducers: {
    saveMessages: (state, action) => {
      console.log(action.payload, '=제대로 갑 들어오나');
      state.userDM = action.payload;
    },
    deleteMessageStack: (state, action) => {
      state.userDM = [];
    },
    addRecentMessage: (state, action) => {
      console.log(action.payload, '=제대로 갑 들어오나');
      state.userDM.unshift(action.payload);
    },
  },
  extraReducers: {},
});

export const {saveMessages, addRecentMessage, deleteMessageStack} =
  userDMSLice.actions;
export default userDMSLice.reducer;
