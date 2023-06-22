import { createSlice } from '@reduxjs/toolkit';

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: false,
  reducers: {
    toggleDarkMode: (state) => {
      console.log('toggleDarkMode');
      return !state;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
