import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";


export const fetchSettings = createAsyncThunk(
  "adminSettings/fetch",
  async () => {

    const res = await api.get("/admin/settings");

    return res.data.result;

  }
);



export const updateSettings = createAsyncThunk(
  "adminSettings/update",
  async (data) => {

    const res = await api.put("/admin/settings", data);

    return res.data.result;

  }
);



const adminSettingsSlice = createSlice({

  name:"adminSettings",

  initialState:{
    settings:null,
    loading:false
  },

  reducers:{},

  extraReducers:(builder)=>{

    builder

    .addCase(fetchSettings.pending,(state)=>{
      state.loading = true;
    })

    .addCase(fetchSettings.fulfilled,(state,action)=>{
      state.loading = false;
      state.settings = action.payload;
    })

    .addCase(updateSettings.fulfilled,(state,action)=>{
      state.settings = action.payload;
    });

  }

});

export default adminSettingsSlice.reducer;