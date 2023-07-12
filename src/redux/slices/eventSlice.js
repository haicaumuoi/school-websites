import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addNotification } from '../../component/utilities/commonServices/CommonService';

const initialState = {
  events: {},
  eventDetail: {},
};

export const getEvents = createAsyncThunk(
  "alumnis/getEvents",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://alumniproject.azurewebsites.net/alumni/api/events",
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
      addNotification("error", "", "Get events failed");
    }
  }
);

export const getEventDetail = createAsyncThunk(
    "alumnis/getEventsDetail",
    async (data, thunkAPI) => {
      try {
        const res = await axios.get(
          `https://alumniproject.azurewebsites.net/alumni/api/events/${data.id}`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
              Accept: "*/*"
            },
            params: {
                eventId: data.id
            }
          }
        );
        return res.data;
      } catch (err) {
        addNotification("error", "", "Get event detail failed");
      }
    }
  );



const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getEvents.fulfilled, (state, action) => {
      state.events = action.payload;
    })
    .addCase(getEvents.rejected, (state) => {
        state.events = null;
      })
    .addCase(getEvents.pending, (state) => {
        state.events = null;
      })
      .addCase(getEventDetail.fulfilled, (state, action) => {
        state.eventDetail = action.payload;
      }
      )
        .addCase(getEventDetail.rejected, (state) => {
          state.eventDetail = null;
        }
        )
        .addCase(getEventDetail.pending, (state) => {
          state.eventDetail = null;
        }
        );
  
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedEventsReducer = persistReducer(persistConfig, eventSlice.reducer);

export default persistedEventsReducer;
