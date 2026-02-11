import { createSlice } from "@reduxjs/toolkit";

const adminUISlice = createSlice({
  name: "adminUI",
  initialState: {
    isSidebarOpen: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = adminUISlice.actions;
export default adminUISlice.reducer;
