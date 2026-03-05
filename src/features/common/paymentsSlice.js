

// // // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // // import axios from "../../utils/axiosInstance";

// // // /* =========================
// // // TUTOR API CALLS
// // // ========================= */

// // // export const fetchTutorEarnings = createAsyncThunk(
// // // "payments/fetchTutorEarnings",
// // // async () => {
// // // const res = await axios.get("/tutor/earnings");
// // // return res.data.result;
// // // }
// // // );

// // // export const fetchTutorHistory = createAsyncThunk(
// // // "payments/fetchTutorHistory",
// // // async (page = 1) => {
// // // const res = await axios.get(`/tutor/earnings/history?page=${page}`);
// // // return res.data;
// // // }
// // // );

// // // export const fetchTutorPayouts = createAsyncThunk(
// // // "payments/fetchTutorPayouts",
// // // async (page = 1) => {
// // // const res = await axios.get(`/tutor/payouts?page=${page}`);
// // // return res.data;
// // // }
// // // );

// // // export const requestPayout = createAsyncThunk(
// // // "payments/requestPayout",
// // // async (data) => {
// // // const res = await axios.post("/tutor/earnings/request", data);
// // // return res.data;
// // // }
// // // );

// // // /* =========================
// // // ADMIN API CALLS
// // // ========================= */

// // // export const fetchAdminRevenue = createAsyncThunk(
// // // "payments/fetchAdminRevenue",
// // // async () => {
// // // const res = await axios.get("/admin/revenue");
// // // return res.data.result;
// // // }
// // // );

// // // export const fetchAdminPayouts = createAsyncThunk(
// // // "payments/fetchAdminPayouts",
// // // async ({page=1,status="all"}) => {

// // // const res = await axios.get(
// // // `/admin/payouts?page=${page}&status=${status}`
// // // );

// // // return res.data;

// // // }
// // // );

// // // export const fetchAdminPayments = createAsyncThunk(
// // // "payments/fetchAdminPayments",
// // // async (page = 1) => {
// // // const res = await axios.get(`/admin/payments?page=${page}`);
// // // return res.data;
// // // }
// // // );

// // // export const markPayoutPaid = createAsyncThunk(
// // // "payments/markPayoutPaid",
// // // async (id) => {
// // // await axios.patch(`/admin/payouts/${id}/pay`);
// // // return id;
// // // }
// // // );

// // // /* =========================
// // // SLICE
// // // ========================= */

// // // const paymentsSlice = createSlice({
// // // name: "payments",

// // // initialState: {
// // // stats: null,
// // // history: [],
// // // payouts: [],
// // // adminPayments: [],
// // // adminStats: null,
// // // page: 1,
// // // totalPages: 1,
// // // loading: false,
// // // },

// // // reducers: {},

// // // extraReducers: (builder) => {
// // // builder


// // //   /* ================= TUTOR ================= */

// // //   .addCase(fetchTutorEarnings.pending, (state) => {
// // //     state.loading = true;
// // //   })
// // //   .addCase(fetchTutorEarnings.fulfilled, (state, action) => {
// // //     state.stats = action.payload;
// // //     state.loading = false;
// // //   })

// // //   .addCase(fetchTutorHistory.pending, (state) => {
// // //     state.loading = true;
// // //   })
// // //   .addCase(fetchTutorHistory.fulfilled, (state, action) => {
// // //     state.history = action.payload.result;
// // //     state.page = action.payload.currentPage || 1;
// // //     state.totalPages = action.payload.totalPages || 1;
// // //     state.loading = false;
// // //   })

// // //   .addCase(fetchTutorPayouts.pending, (state) => {
// // //     state.loading = true;
// // //   })
// // //   .addCase(fetchTutorPayouts.fulfilled, (state, action) => {
// // //     state.payouts = action.payload.result;
// // //     state.page = action.payload.currentPage;
// // //     state.totalPages = action.payload.totalPages;
// // //     state.loading = false;
// // //   })

// // //   .addCase(requestPayout.fulfilled, (state, action) => {
// // //     state.payouts.unshift(action.payload.payout);
// // //   })

// // //   /* ================= ADMIN ================= */

// // //   .addCase(fetchAdminRevenue.pending, (state) => {
// // //     state.loading = true;
// // //   })
// // //   .addCase(fetchAdminRevenue.fulfilled, (state, action) => {
// // //     state.adminStats = action.payload;
// // //     state.loading = false;
// // //   })

// // //   .addCase(fetchAdminPayouts.pending, (state) => {
// // //     state.loading = true;
// // //   })
// // //  .addCase(fetchAdminPayouts.fulfilled,(state,action)=>{
// // // state.payouts = action.payload.result;
// // // state.page = action.payload.currentPage;
// // // state.totalPages = action.payload.totalPages;
// // // state.loading = false;
// // // })
// // //   .addCase(fetchAdminPayments.pending, (state) => {
// // //     state.loading = true;
// // //   })
// // //   .addCase(fetchAdminPayments.fulfilled, (state, action) => {
// // //     state.adminPayments = action.payload.result;
// // //     state.page = action.payload.currentPage;
// // //     state.totalPages = action.payload.totalPages;
// // //     state.loading = false;
// // //   })

// // //   .addCase(markPayoutPaid.fulfilled, (state, action) => {
// // //     state.payouts = state.payouts.map((p) =>
// // //       p._id === action.payload ? { ...p, status: "paid" } : p
// // //     );
// // //   });


// // // },
// // // });

// // // export default paymentsSlice.reducer;

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "../../utils/axiosInstance";

// // /* =========================
// // TUTOR API
// // ========================= */

// // export const fetchTutorEarnings = createAsyncThunk(
// // "payments/fetchTutorEarnings",
// // async () => {
// // const res = await axios.get("/tutor/earnings");
// // return res.data.result;
// // }
// // );

// // export const fetchTutorHistory = createAsyncThunk(
// // "payments/fetchTutorHistory",
// // async (page = 1) => {
// // const res = await axios.get(`/tutor/earnings/history?page=${page}`);
// // return res.data;
// // }
// // );

// // export const fetchTutorPayouts = createAsyncThunk(
// // "payments/fetchTutorPayouts",
// // async (page = 1) => {
// // const res = await axios.get(`/tutor/payouts?page=${page}`);
// // return res.data;
// // }
// // );

// // export const requestPayout = createAsyncThunk(
// // "payments/requestPayout",
// // async (data) => {
// // const res = await axios.post("/tutor/earnings/request", data);
// // return res.data;
// // }
// // );

// // /* =========================
// // ADMIN API
// // ========================= */

// // export const fetchAdminRevenue = createAsyncThunk(
// // "payments/fetchAdminRevenue",
// // async () => {
// // const res = await axios.get("/admin/revenue");
// // return res.data.result;
// // }
// // );

// // export const fetchAdminPayments = createAsyncThunk(
// // "payments/fetchAdminPayments",
// // async (page = 1) => {
// // const res = await axios.get(`/admin/payments?page=${page}`);
// // return res.data;
// // }
// // );

// // export const fetchAdminPayouts = createAsyncThunk(
// // "payments/fetchAdminPayouts",
// // async ({ page = 1, status = "all" }) => {

// // const res = await axios.get(
// // `/admin/payouts?page=${page}&status=${status}`
// // );

// // return res.data;

// // }
// // );

// // export const markPayoutPaid = createAsyncThunk(
// // "payments/markPayoutPaid",
// // async (id) => {

// // await axios.patch(`/admin/payouts/${id}/pay`);

// // return id;

// // }
// // );

// // /* =========================
// // SLICE
// // ========================= */

// // const paymentsSlice = createSlice({

// // name: "payments",

// // initialState: {

// // stats:null,
// // history:[],
// // payouts:[],
// // adminPayments:[],
// // adminStats:null,

// // /* pagination */

// // paymentsPage:1,
// // paymentsTotalPages:1,

// // payoutPage:1,
// // payoutTotalPages:1,

// // loading:false

// // },

// // reducers:{},

// // extraReducers:(builder)=>{

// // builder

// // /* ================= TUTOR ================= */

// // .addCase(fetchTutorEarnings.fulfilled,(state,action)=>{
// // state.stats = action.payload;
// // })

// // .addCase(fetchTutorHistory.fulfilled,(state,action)=>{
// // state.history = action.payload.result;
// // })

// // .addCase(fetchTutorPayouts.fulfilled,(state,action)=>{
// // state.payouts = action.payload.result;
// // })

// // .addCase(requestPayout.fulfilled,(state,action)=>{
// // state.payouts.unshift(action.payload.payout);
// // })

// // /* ================= ADMIN ================= */

// // .addCase(fetchAdminRevenue.fulfilled,(state,action)=>{
// // state.adminStats = action.payload;
// // })

// // /* ADMIN PAYMENTS */

// // .addCase(fetchAdminPayments.pending,(state)=>{
// // state.loading=true;
// // })

// // .addCase(fetchAdminPayments.fulfilled,(state,action)=>{
// // state.adminPayments = action.payload.result;

// // state.paymentsPage = action.payload.currentPage;

// // state.paymentsTotalPages = action.payload.totalPages;

// // state.loading=false;
// // })

// // /* ADMIN PAYOUTS */

// // .addCase(fetchAdminPayouts.pending,(state)=>{
// // state.loading=true;
// // })

// // .addCase(fetchAdminPayouts.fulfilled,(state,action)=>{
// // state.payouts = action.payload.result;

// // state.payoutPage = action.payload.currentPage;

// // state.payoutTotalPages = action.payload.totalPages;

// // state.loading=false;
// // })

// // /* MARK PAID */

// // .addCase(markPayoutPaid.fulfilled,(state,action)=>{

// // const index = state.payouts.findIndex(
// // p=>p._id===action.payload
// // );

// // if(index !== -1){
// // state.payouts[index].status = "paid";
// // }

// // });

// // }

// // });

// // export default paymentsSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../utils/axiosInstance";

// /* =========================
// TUTOR API
// ========================= */

// export const fetchTutorEarnings = createAsyncThunk(
//   "payments/fetchTutorEarnings",
//   async () => {
//     const res = await axios.get("/tutor/earnings");
//     return res.data.result;
//   }
// );

// export const fetchTutorHistory = createAsyncThunk(
//   "payments/fetchTutorHistory",
//   async (page = 1) => {
//     const res = await axios.get(`/tutor/earnings/history?page=${page}`);
//     return res.data;
//   }
// );

// export const fetchTutorPayouts = createAsyncThunk(
//   "payments/fetchTutorPayouts",
//   async (page = 1) => {
//     const res = await axios.get(`/tutor/payouts?page=${page}`);
//     return res.data;
//   }
// );

// export const requestPayout = createAsyncThunk(
//   "payments/requestPayout",
//   async (data) => {
//     const res = await axios.post("/tutor/earnings/request", data);
//     return res.data;
//   }
// );

// /* =========================
// ADMIN API
// ========================= */

// export const fetchAdminRevenue = createAsyncThunk(
//   "payments/fetchAdminRevenue",
//   async () => {
//     const res = await axios.get("/admin/revenue");
//     return res.data.result;
//   }
// );

// export const fetchAdminPayments = createAsyncThunk(
//   "payments/fetchAdminPayments",
//   async (page = 1) => {
//     const res = await axios.get(`/admin/payments?page=${page}`);
//     return res.data;
//   }
// );

// export const fetchAdminPayouts = createAsyncThunk(
//   "payments/fetchAdminPayouts",
//   async ({ page = 1, status = "all" }) => {
//     const res = await axios.get(
//       `/admin/payouts?page=${page}&status=${status}`
//     );
//     return res.data;
//   }
// );

// export const markPayoutPaid = createAsyncThunk(
//   "payments/markPayoutPaid",
//   async (id) => {
//     await axios.patch(`/admin/payouts/${id}/pay`);
//     return id;
//   }
// );

// /* =========================
// SLICE
// ========================= */

// const paymentsSlice = createSlice({
//   name: "payments",

//   initialState: {
//     stats: null,
//     history: [],
//     payouts: [],
//     adminPayments: [],
//     adminStats: null,

//     paymentsPage: 1,
//     paymentsTotalPages: 1,

//     payoutPage: 1,
//     payoutTotalPages: 1,

//     loading: false,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       /* ================= TUTOR ================= */

//       .addCase(fetchTutorEarnings.fulfilled, (state, action) => {
//         state.stats = action.payload;
//       })

//       .addCase(fetchTutorHistory.fulfilled, (state, action) => {
//         state.history = action.payload.result;
//       })

//       .addCase(fetchTutorPayouts.fulfilled, (state, action) => {
//         state.payouts = action.payload.result;
//       })

//       .addCase(requestPayout.fulfilled, (state, action) => {
//         state.payouts.unshift(action.payload.payout);
//       })

//       /* ================= ADMIN ================= */

//       .addCase(fetchAdminRevenue.fulfilled, (state, action) => {
//         state.adminStats = action.payload;
//       })

//       /* ADMIN PAYMENTS */

//       .addCase(fetchAdminPayments.pending, (state) => {
//         state.loading = true;
//       })

//       .addCase(fetchAdminPayments.fulfilled, (state, action) => {
//         state.adminPayments = action.payload.result;

//         state.paymentsPage = action.payload.currentPage;
//         state.paymentsTotalPages = action.payload.totalPages;

//         state.loading = false;
//       })

//       /* ADMIN PAYOUTS */

//       .addCase(fetchAdminPayouts.pending, (state) => {
//         state.loading = true;
//       })

//       .addCase(fetchAdminPayouts.fulfilled, (state, action) => {
//         state.payouts = action.payload.result;

//         state.payoutPage = action.payload.currentPage;
//         state.payoutTotalPages = action.payload.totalPages;

//         state.loading = false;
//       })

//       /* MARK PAID */

//       .addCase(markPayoutPaid.fulfilled, (state, action) => {
//         const index = state.payouts.findIndex(
//           (p) => p._id === action.payload
//         );

//         if (index !== -1) {
//           state.payouts[index].status = "paid";
//         }
//       });
//   },
// });

// export default paymentsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

/* =========================
TUTOR API
========================= */

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
  async (data) => {
    const res = await axios.post("/tutor/earnings/request", data);
    return res.data;
  }
);

/* =========================
ADMIN API
========================= */

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

/* =========================
SLICE
========================= */

const paymentsSlice = createSlice({
  name: "payments",

  initialState: {
    stats: null,
    history: [],
    payouts: [],
    adminPayments: [],
    adminStats: null,

    /* tutor pagination */

    page: 1,
    totalPages: 1,

    /* admin pagination */

    paymentsPage: 1,
    paymentsTotalPages: 1,

    payoutPage: 1,
    payoutTotalPages: 1,

    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ================= TUTOR ================= */

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

      /* ================= ADMIN ================= */

      .addCase(fetchAdminRevenue.fulfilled, (state, action) => {
        state.adminStats = action.payload;
      })

      /* ADMIN PAYMENTS */

      .addCase(fetchAdminPayments.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminPayments.fulfilled, (state, action) => {
        state.adminPayments = action.payload.result;

        state.paymentsPage = action.payload.currentPage;
        state.paymentsTotalPages = action.payload.totalPages;

        state.loading = false;
      })

      /* ADMIN PAYOUTS */

      .addCase(fetchAdminPayouts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminPayouts.fulfilled, (state, action) => {
        state.payouts = action.payload.result;

        state.payoutPage = action.payload.currentPage;
        state.payoutTotalPages = action.payload.totalPages;

        state.loading = false;
      })

      /* MARK PAID */

      .addCase(markPayoutPaid.fulfilled, (state, action) => {

const payout = state.payouts.find(p => p._id === action.payload);

if (payout) {

payout.status = "paid";

/* update admin stats instantly */

if (state.adminStats) {

state.adminStats.pendingPayout -= payout.amount;

}

}

});
  },
});

export default paymentsSlice.reducer;