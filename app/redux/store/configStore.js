import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/loginSlice';
import addContent from '../modules/addContentSlice';
import todos from '../modules/todoSlice';
import userDetail from '../modules/userDetailSlice';

const store = configureStore({
  reducer: {
    login,
    addContent,
    todos,
    userDetail,
  },
});

export default store;
