import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state with the new schema
const initialState = {
  school: {
    name: '',
    description: '',
    subDomain: '',
    backGround1: '',
    backGround2: '',
    backGround3: '',
    icon: '',
    provinceName: '',
    cityName: '',
    address: '',
    theme: '',
    endTime: ''
  },
  schoolLoading: false,
};

export const getSchool = createAsyncThunk(
    "school/school_list",
    async (params, thunkAPI) => {
      try {
        const res = await axios.get(`https://alumniproject.azurewebsites.net/alumni/api/schools/subDomain`, {
          params: {
            subDomain: "fpt.vercel"
          }
        });
        return res.data;
      } catch (error) {
        console.log(error.response.data);
      }
    }
  );

  
// Create the school slice
const schoolSlice = createSlice({
    name: "schools",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getSchool.fulfilled, (state, action) => {
          state.schoolLoading = false;
          state.school = action.payload;
        })
        .addCase(getSchool.pending, (state) => {
          state.schoolLoading = true;
        })
    }
  });
  
  // Update the export statement

// Create the persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["schools"],
};

// Create the persisted user slice
const persistedSchoolSlice = persistReducer(persistConfig, schoolSlice.reducer);

export default persistedSchoolSlice;
  

