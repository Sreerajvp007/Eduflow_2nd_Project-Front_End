

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";


export const fetchParents = createAsyncThunk(
  "adminParents/fetch",
  async (params = {}) => {
    const { data } = await api.get("/admin/parents", {
      params: {
        page: params.page || 1,
        limit: 5,
        search: params.search || "",
        status: params.status || "",
      },
    });

    return data;
  }
);


export const fetchParentDetails = createAsyncThunk(
  "adminParents/details",
  async (id) => {
    const { data } = await api.get(`/admin/parents/${id}`);
    return data.result;
  }
);


export const updateParentStatus = createAsyncThunk(
  "adminParents/updateStatus",
  async ({ id, status }) => {
    const res = await api.put(
      `/admin/parents/${id}/status`,
      { status }
    );
    return res.data.result;
  }
);

const parentSlice = createSlice({
  name: "adminParents",
  initialState: {
    list: [],
    pagination: {},
    details: null,
    loading: false,
  },

  reducers: {
   
    updateLocalStatus: (state, action) => {
      if (state.details) {
        state.details.status = action.payload;
      }

    
      state.list = state.list.map((p) =>
        p._id === state.details?._id
          ? { ...p, status: action.payload }
          : p
      );
    },
  },

  extraReducers: (builder) => {
    builder

    
      .addCase(fetchParents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.result;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchParents.rejected, (state) => {
        state.loading = false;
      })

      
      .addCase(fetchParentDetails.fulfilled, (state, action) => {
        state.details = action.payload; 
      })

 
      .addCase(updateParentStatus.fulfilled, (state, action) => {
        if (state.details) {
          state.details = {
            ...state.details,
            ...action.payload, 
          };
        }

    
        state.list = state.list.map((p) =>
          p._id === action.payload._id
            ? { ...p, ...action.payload }
            : p
        );
      });
  },
});

export const { updateLocalStatus } = parentSlice.actions;
export default parentSlice.reducer;