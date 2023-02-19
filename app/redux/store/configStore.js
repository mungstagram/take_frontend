import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/loginSlice';
import todos from '../modules/todoSlice';

const store = configureStore({
  reducer: {
    login,
    todos,
  },
});

export default store;
