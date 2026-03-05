import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

export const fetchParentPayments = createAsyncThunk(
  "parentPayments/fetch",
  async ({ studentId, page = 1, search = "", status = "", month = "" }) => {

    const res = await axios.get(
      `/payments/parent/payments?studentId=${studentId}&page=${page}&search=${search}&status=${status}&month=${month}`
    );

    return res.data;
  }
);

const parentPaymentSlice = createSlice({
  name: "parentPayments",

  initialState: {
    payments: [],
    page: 1,
    totalPages: 1,
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(fetchParentPayments.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchParentPayments.fulfilled, (state, action) => {

        state.loading = false;
        state.payments = action.payload.payments;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;

      })

      .addCase(fetchParentPayments.rejected, (state) => {
        state.loading = false;
      });

  },
});

export default parentPaymentSlice.reducer;