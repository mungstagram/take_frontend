import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/loginSlice';
import addContent from '../modules/addContentSlice';
import todos from '../modules/todoSlice';
import userDetail from '../modules/userDetailSlice';
import searchData from '../modules/searchSlice';
const store = configureStore({
  reducer: {
    login,
    addContent,
    todos,
    userDetail,
    searchData,
  },
});

export default store;
