import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/loginSlice';
import addContent from '../modules/addContentSlice';
import todos from '../modules/todoSlice';
import userDetail from '../modules/userDetailSlice';
import searchData from '../modules/searchSlice';
import userDM from '../modules/userDMSlice';
const store = configureStore({
  reducer: {
    login,
    addContent,
    todos,
    userDetail,
    searchData,
    userDM,
  },
});

export default store;
