import { createSlice } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    user: {}
  },
  reducers: {
    initToken: (state, action) => {
      SecureStore.setItemAsync('token', action.payload);
      state.token = action.payload
    },
    initUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { initToken, initUser } = authSlice.actions

export const getToken = (state) => state.auth.token

export const getUser = (state) => state.auth.user

export default authSlice.reducer
