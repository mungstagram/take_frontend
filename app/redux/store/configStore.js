import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/loginSlice';
import addContent from '../modules/addContentSlice';
import todoSlice from '../modules/todoSlice';

const store = configureStore({
  reducer: {
    login,
    addContent,
    todoSlice,
  },
});

export default store;
