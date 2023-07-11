// import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import persistedAuthReducer from "./slices/authSlice";
import darkModeReducer from "./slices/darkModeSlice"; // Update the import statement
import persistedSchoolSlice from "./slices/schoolSlice";
import persistedGradeReducer from "./slices/gradeSlice";
import persistedNewsReducer from "./slices/newSlice";
import persistedClassReducer from "./slices/classSice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  darkMode: darkModeReducer, // Update the variable name
  schoolReducer: persistedSchoolSlice,
  authReducer: persistedAuthReducer,
  gradeReducer: persistedGradeReducer,
  classReducer: persistedClassReducer,
  newReducer: persistedNewsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
