import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

export const fetchAnalytics = createAsyncThunk(
"adminAnalytics/fetch",
async()=>{

const res = await api.get("/admin/analytics");

return res.data.result;

}
);

const adminAnalyticsSlice = createSlice({

name:"adminAnalytics",

initialState:{
data:null,
loading:false
},

reducers:{},

extraReducers:(builder)=>{

builder

.addCase(fetchAnalytics.pending,(state)=>{
state.loading=true;
})

.addCase(fetchAnalytics.fulfilled,(state,action)=>{
state.loading=false;
state.data=action.payload;
});

}

});

export default adminAnalyticsSlice.reducer;