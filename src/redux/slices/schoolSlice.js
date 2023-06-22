import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state with the new schema
const initialState = {
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
  endTime: '',
};

export const getSchoolList = createAsyncThunk(
    "school/school_list",
    async (params, thunkAPI) => {
      const { page, rowsPerPage, token } = params;
      try {
        const res = await axios.get(`https://alumniproject.azurewebsites.net/api/alumni/schools/subDomain?subDomain=${subDomain}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*"
          }
        });
        return res.data;
      } catch (error) {
        console.log(error.response.data);
      }
    }
  );
  
  // Update the remaining createAsyncThunk actions in a similar way
  
// Create the school slice
const schoolSlice = createSlice({
    name: "schools",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getSchoolList.pending, (state) => {
          state.loading = true;
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
  

