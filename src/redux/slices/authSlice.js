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
  async (data, thunkAPI) => {
    const { token, schoolId } = data;
    try {
      const res = await axios.post(
        "https://alumniproject.azurewebsites.net/api/alumnis/login",
        {
          token: token,
        }
      );
      const decode = jwt_decode(res.data);
      if(decode && decode.schoolId == schoolId) {
        addNotification("success","", "Login successfully");
        const tokenReturn = res.data;
        return { decode, tokenReturn }; 
      } else {
        addNotification("error","", "You've already registered to a different school");
        return null;
      }
    } catch (err) {
      addNotification("error","", "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "alumnis/logout",
  async (_, thunkAPI) => {
    try {
      addNotification("success", "", "Logout successful");
      return;
    } catch (err) {
      addNotification("error", "", "Logout failed");
      throw err;
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
      })
      .addCase(logout.fulfilled, (state) => {
        state.loginState = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state) => {
        // Handle any specific error cases if needed
      })
      .addCase(logout.pending, (state) => {
        // Handle any specific pending state if needed
      });
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, loginSlice.reducer);

export default persistedAuthReducer;
