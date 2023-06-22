import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addNotification } from '../../component/utilities/commonServices/CommonService';

const initialState = {
  loginState: false,
};

export const login = createAsyncThunk(
  "alumnis/login",
  async (token, thunkAPI) => {
    try {
      const res = await axios.post(
        "https://alumniproject.azurewebsites.net/api/alumnis/login",
        token
      );
      addNotification("success", "Login successfully");
      return res.status == 200; 
    } catch (err) {
      addNotification("error", "Login failed");
      return res.status == 200; 
    }
  }
);

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.loginState = true;
      })
      .addCase(login.rejected, (state) => {
        state.loginState = false;
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
