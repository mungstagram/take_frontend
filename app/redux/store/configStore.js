import {configureStore} from '@reduxjs/toolkit';

import login from '../modules/loginSlice';
import addContent from '../modules/addContentSlice';

const store = configureStore({
  reducer: {
    login,
    addContent,
  },
});

export default store;
