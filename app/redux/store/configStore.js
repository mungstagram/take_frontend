import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/loginSlice';
import addContent from '../modules/addContentSlice';
import todos from '../modules/todoSlice';
import userDetail from '../modules/userDetailSlice';
import searchData from '../modules/searchSlice';
import profile from '../modules/profileSlice';
import profileImgSlice from '../modules/profileImgSlice';

const store = configureStore({
  reducer: {
    login,
    profile,
    addContent,
    todos,
    userDetail,
    searchData,
    profileImgSlice,
  },
});

export default store;
