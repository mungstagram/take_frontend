import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/LoginSlice';
const store = configureStore({
  reducer: {
    login,
  },
});

export default store;
