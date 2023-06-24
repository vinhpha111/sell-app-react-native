import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';
import loadingReducer from './loadingSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    loading: loadingReducer
  }  
});
