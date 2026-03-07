
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";



export const fetchTutorEarnings = createAsyncThunk(
  "payments/fetchTutorEarnings",
  async () => {
    const res = await axios.get("/tutor/earnings");
    return res.data.result;
  }
);

export const fetchTutorHistory = createAsyncThunk(
  "payments/fetchTutorHistory",
  async (page = 1) => {
    const res = await axios.get(`/tutor/earnings/history?page=${page}`);
    return res.data;
  }
);

export const fetchTutorPayouts = createAsyncThunk(
  "payments/fetchTutorPayouts",
  async (page = 1) => {
    const res = await axios.get(`/tutor/payouts?page=${page}`);
    return res.data;
  }
);

export const requestPayout = createAsyncThunk(
  "payments/requestPayout",
  async (data, thunkAPI) => {
    try {

      const res = await axios.post("/tutor/earnings/request", data);

      return res.data;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Payout request failed"
      );

    }
  }
);



export const fetchAdminRevenue = createAsyncThunk(
  "payments/fetchAdminRevenue",
  async () => {
    const res = await axios.get("/admin/revenue");
    return res.data.result;
  }
);

export const fetchAdminPayments = createAsyncThunk(
  "payments/fetchAdminPayments",
  async (page = 1) => {
    const res = await axios.get(`/admin/payments?page=${page}`);
    return res.data;
  }
);

export const fetchAdminPayouts = createAsyncThunk(
  "payments/fetchAdminPayouts",
  async ({ page = 1, status = "all" }) => {
    const res = await axios.get(
      `/admin/payouts?page=${page}&status=${status}`
    );
    return res.data;
  }
);

export const markPayoutPaid = createAsyncThunk(
  "payments/markPayoutPaid",
  async (id) => {
    await axios.patch(`/admin/payouts/${id}/pay`);
    return id;
  }
);



const paymentsSlice = createSlice({
  name: "payments",

  initialState: {
    stats: null,
    history: [],
    payouts: [],
    adminPayments: [],
    adminStats: null,

  

    page: 1,
    totalPages: 1,

    

    paymentsPage: 1,
    paymentsTotalPages: 1,

    payoutPage: 1,
    payoutTotalPages: 1,

    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

  

      .addCase(fetchTutorEarnings.fulfilled, (state, action) => {
        state.stats = action.payload;
      })

      .addCase(fetchTutorHistory.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTutorHistory.fulfilled, (state, action) => {
        state.history = action.payload.result;

        state.page = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;

        state.loading = false;
      })

      .addCase(fetchTutorPayouts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTutorPayouts.fulfilled, (state, action) => {
        state.payouts = action.payload.result;

        state.page = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;

        state.loading = false;
      })

      .addCase(requestPayout.fulfilled,(state,action)=>{

state.payouts.unshift(action.payload.payout);

if(state.stats){

state.stats.pendingAmount += action.payload.payout.amount;

state.stats.walletBalance -= action.payload.payout.amount;

}

})

    

      .addCase(fetchAdminRevenue.fulfilled, (state, action) => {
        state.adminStats = action.payload;
      })

     

      .addCase(fetchAdminPayments.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminPayments.fulfilled, (state, action) => {
        state.adminPayments = action.payload.result;

        state.paymentsPage = action.payload.currentPage;
        state.paymentsTotalPages = action.payload.totalPages;

        state.loading = false;
      })

      

      .addCase(fetchAdminPayouts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminPayouts.fulfilled, (state, action) => {
        state.payouts = action.payload.result;

        state.payoutPage = action.payload.currentPage;
        state.payoutTotalPages = action.payload.totalPages;

        state.loading = false;
      })

      

      .addCase(markPayoutPaid.fulfilled, (state, action) => {

const payout = state.payouts.find(p => p._id === action.payload);

if (payout) {

payout.status = "paid";



if (state.adminStats) {

state.adminStats.pendingPayout -= payout.amount;

}

}

});
  },
});

export default paymentsSlice.reducer;