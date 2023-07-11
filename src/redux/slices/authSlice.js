import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addNotification } from '../../component/utilities/commonServices/CommonService';

const initialState = {
  loginState: false,
  user: null,
  token: null,
};

export const login = createAsyncThunk(
  "alumnis/login",
  async (token, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://alumniproject.azurewebsites.net/api/alumnis/login",
        token
      );
      const decode = jwt_decode(res.data);
      if(decode)
      addNotification("success","", "Login successfully");
      const tokenReturn = res.data;
      return {decode, tokenReturn}; 
    } catch (err) {
      addNotification("error","", "Login failed");
    }
  }
);

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.decode;
      state.token = action.payload.tokenReturn;
      state.loginState = true;
    })
      .addCase(login.rejected, (state) => {
        state.loginState = false;
        state.userState = null;
      })
      .addCase(login.pending, (state) => {
        state.loginState = null;
      });
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, loginSlice.reducer);

export default persistedAuthReducer;
