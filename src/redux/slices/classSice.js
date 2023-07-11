import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addNotification } from '../../component/utilities/commonServices/CommonService';

const initialState = {
  classList: [],
  fetchingClass: false,
};
export const getClass = createAsyncThunk(
  "alumnis/getClass",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://alumniproject.azurewebsites.net/alumni/api/classes",
        {
          params: {
            gradeId: 1
          }
        }
      );
      return res.data;
    } catch (err) {
      addNotification("error", "", "Get class failed");
    }
  }
);


const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getClass.fulfilled, (state, action) => {
      state.classList = action.payload;
      state.fetchingClass = false;
    })
      .addCase(getClass.rejected, (state) => {
        state.classList = null;
      })
      .addCase(getClass.pending, (state) => {
        state.classList = null;
        state.fetchingClass = true;
      });
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedClassReducer = persistReducer(persistConfig, classSlice.reducer);

export default persistedClassReducer;
