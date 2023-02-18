import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/loginSlice';
import addContentSlice from '../modules/addContentSlice';
const store = configureStore({
  reducer: {
    login,
    addContentSlice,
  },
});

export default store;
