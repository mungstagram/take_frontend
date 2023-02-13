import {configureStore} from '@reduxjs/toolkit';
import login from '../modules/loginSlice';
const store = configureStore({
  reducer: {
    login,
  },
});

export default store;
