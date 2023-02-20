import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/loginSlice';
import addContentSlice from '../modules/addContentSlice';
import todos from '../modules/todoSlice';

const store = configureStore({
  reducer: {
    login,
    addContentSlice,
    todos,
  },
});

export default store;
