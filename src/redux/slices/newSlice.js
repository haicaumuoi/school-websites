import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addNotification } from '../../component/utilities/commonServices/CommonService';

const initialState = {
  news: {},
};
export const getNews = createAsyncThunk(
  "alumnis/getNews",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://alumniproject.azurewebsites.net/alumni/api/news",
        {
            headers: {
              Authorization: `Bearer ${data.token}`,
              Accept: "*/*"
            },
            params: {
              pageNo: data.pageNo,
              pageSize: 6,
            }
          }
      );
      return res.data;
    } catch (err) {
      addNotification("error", "", "Get news failed");
    }
  }
);





const newSlice = createSlice({
  name: 'new',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getNews.fulfilled, (state, action) => {
      state.news = action.payload;
    })
      .addCase(getNews.rejected, (state) => {
        state.news = null;
      })
      .addCase(getNews.pending, (state) => {
        state.news = null;
      })
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedNewsReducer = persistReducer(persistConfig, newSlice.reducer);

export default persistedNewsReducer;
