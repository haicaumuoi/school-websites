import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addNotification } from '../../component/utilities/commonServices/CommonService';

const initialState = {
  gradeList: [],
};
export const getGrade = createAsyncThunk(
  "alumnis/getGrade",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://alumniproject.azurewebsites.net/alumni/api/grades",
        {
          params: {
            SchoolId: 1
          }
        }
      );
      return res.data;
    } catch (err) {
      addNotification("error", "", "Get grade failed");
    }
  }
);


const gradeSlice = createSlice({
  name: 'grade',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getGrade.fulfilled, (state, action) => {
      state.gradeList = action.payload;
    })
      .addCase(getGrade.rejected, (state) => {
        state.gradeList = null;
      })
      .addCase(getGrade.pending, (state) => {
        state.gradeList = null;
      });
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedGradeReducer = persistReducer(persistConfig, gradeSlice.reducer);

export default persistedGradeReducer;
