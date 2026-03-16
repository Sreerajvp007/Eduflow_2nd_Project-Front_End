import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axiosInstance";

export const fetchTutors = createAsyncThunk(
  "adminTutors/fetch",
  async (params = {}, thunkAPI) => {
    try {
      const res = await api.get("/admin/tutors", {
        params: {
          page: params.page || 1,
          limit: 2,
          search: params.search || "",
          status: params.status || "",
          subject: params.subject || "",
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch tutors",
      );
    }
  },
);

export const fetchTutorDetails = createAsyncThunk(
  "adminTutors/details",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/admin/tutors/${id}`);
      return res.data.result;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch tutor",
      );
    }
  },
);

export const updateTutorStatus = createAsyncThunk(
  "adminTutors/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      await api.patch(`/admin/tutors/${id}/status`, { status });
      return { id, status };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update status",
      );
    }
  },
);

export const fetchPendingTutors = createAsyncThunk(
  "adminTutors/fetchPending",
  async ({ page = 1 } = {}, thunkAPI) => {
    try {
      const res = await api.get("/admin/tutors/pending", {
        params: {
          page,
          limit: 5,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch pending tutors",
      );
    }
  },
);

export const approveTutor = createAsyncThunk(
  "adminTutors/approve",
  async (id, thunkAPI) => {
    try {
      await api.patch(`/admin/tutors/${id}/approve`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to approve tutor",
      );
    }
  },
);

export const rejectTutor = createAsyncThunk(
  "adminTutors/reject",
  async ({ id, reason }, thunkAPI) => {
    try {
      await api.patch(`/admin/tutors/${id}/reject`, { reason });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to reject tutor",
      );
    }
  },
);

export const verifyQualification = createAsyncThunk(
  "adminTutors/verifyQualification",
  async ({ tutorId, qualificationId }, thunkAPI) => {
    try {
      await api.patch(
        `/admin/tutors/${tutorId}/qualifications/${qualificationId}/verify`,
      );
      return { tutorId, qualificationId };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to verify qualification",
      );
    }
  },
);

export const verifyTutorId = createAsyncThunk(
  "adminTutors/verifyId",
  async (tutorId, thunkAPI) => {
    try {
      await api.patch(`/admin/tutors/${tutorId}/verify-id`);
      return tutorId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to verify ID",
      );
    }
  },
);

export const fetchProfileEditRequests = createAsyncThunk(
  "adminTutors/fetchProfileEditRequests",
  async ({ page = 1 } = {}, thunkAPI) => {
    try {
      const res = await api.get("/admin/profile-edit-requests", {
        params: {
          page,
          limit: 5,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch edit requests",
      );
    }
  },
);

export const approveProfileEdit = createAsyncThunk(
  "adminTutors/approveProfileEdit",
  async (requestId, thunkAPI) => {
    try {
      await api.patch(`/admin/profile-edit/${requestId}/approve`);
      return requestId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to approve request",
      );
    }
  },
);

export const rejectProfileEdit = createAsyncThunk(
  "adminTutors/rejectProfileEdit",
  async (requestId, thunkAPI) => {
    try {
      await api.patch(`/admin/profile-edit/${requestId}/reject`);
      return requestId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to reject request",
      );
    }
  },
);

const adminTutorSlice = createSlice({
  name: "adminTutors",
  initialState: {
    list: [],
    pendingList: [],
    editRequests: [],
    details: null,
    loading: false,
    pagination: null,
    requestPagination: null,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTutors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTutors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.result;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTutors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTutorDetails.pending, (state) => {
        state.loading = true;
        state.details = null;
      })
      .addCase(fetchTutorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchTutorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTutorStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;

        const tutor = state.list.find((t) => t._id === id);
        if (tutor) tutor.status = status;

        if (state.details?._id === id) {
          state.details.status = status;
        }
      })

      .addCase(fetchPendingTutors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingTutors.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingList = action.payload.result;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPendingTutors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(approveTutor.fulfilled, (state, action) => {
        const id = action.payload;

        state.pendingList = state.pendingList.filter((t) => t._id !== id);

        const tutor = state.list.find((t) => t._id === id);
        if (tutor) tutor.status = "active";

        if (state.details?._id === id) {
          state.details.status = "active";
        }
      })

      .addCase(rejectTutor.fulfilled, (state, action) => {
        const id = action.payload;

        state.pendingList = state.pendingList.filter((t) => t._id !== id);

        if (state.details?._id === id) {
          state.details.status = "rejected";
        }
      })

      .addCase(verifyQualification.fulfilled, (state, action) => {
        const { tutorId, qualificationId } = action.payload;

        if (state.details?._id === tutorId) {
          const qualification = state.details.qualifications.find(
            (q) => q._id === qualificationId,
          );
          if (qualification) {
            qualification.verified = true;
          }
        }
      })

      .addCase(verifyTutorId.fulfilled, (state, action) => {
        const tutorId = action.payload;

        if (state.details?._id === tutorId) {
          state.details.idVerification.verified = true;
        }
      })
      .addCase(fetchProfileEditRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.editRequests = action.payload.result;
        state.requestPagination = action.payload.pagination;
      })

      .addCase(approveProfileEdit.fulfilled, (state, action) => {
        state.editRequests = state.editRequests.filter(
          (r) => r._id !== action.payload,
        );
      })

      .addCase(rejectProfileEdit.fulfilled, (state, action) => {
        state.editRequests = state.editRequests.filter(
          (r) => r._id !== action.payload,
        );
      });
  },
});

export default adminTutorSlice.reducer;
