import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addNotification } from '../../component/utilities/commonServices/CommonService';

const initialState = {
  profile: {},
};

export const getPerson = createAsyncThunk(
  "alumnis/getPerson",
  async (token, thunkAPI) => {
    try {
      const res = await axios.get(
        "https://alumniproject.azurewebsites.net/alumni/api/alumnis",
        {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "*/*"
            },
          }
      );
      return res.data;
    } catch (err) {
      addNotification("error", "", "Get data failed");
    }
  }
);

export const modifyPerson = createAsyncThunk(
    "alumnis/modifyPerson",
    async (data, thunkAPI) => {
      try {
        const res = await axios.put(
          `https://alumniproject.azurewebsites.net/alumni/api/alumnis/`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
              Accept: "*/*"
            },
            params: {
               data:  {
                    "id": data.id,
                    "bio": data.bio,
                    "fullName": data.fullName,
                    "avatar_url": data.avatar_url,
                    "coverImage_url": data.coverImage_url,
                    "email": "anhnvhse162082@fpt.edu.vn",
                    "phone": data.phone,
                    "faceBook_url": data.faceBook_url,
                    "dateOfBirth": data.dateOfBirth,
                  }
            }
          }
        );
        return res.data;
      } catch (err) {
        addNotification("error", "", "Get event detail failed");
      }
    }
  );



const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getPerson.fulfilled, (state, action) => {
      state.profile = action.payload;
    })
      .addCase(getPerson.rejected, (state) => {
        state.profile = null;
      })
      .addCase(getPerson.pending, (state) => {
        state.profile = null;
      })
      .addCase(modifyPerson.fulfilled, (state, action) => {
        state.profile = action.payload;
      }
      )
        .addCase(modifyPerson.rejected, (state) => {
          state.profile = null;
        }
        )
        .addCase(modifyPerson.pending, (state) => {
          state.profile = null;
        }
        );
  
  },
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedProfileReducer = persistReducer(persistConfig, profileSlice.reducer);

export default persistedProfileReducer;
