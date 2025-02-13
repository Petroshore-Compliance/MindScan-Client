import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ token, password, newPassword }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/auth/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors || data.message || "Error changing password.");
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: {
    loading: false,
    error: null,
    status: "idle",
    success: false,
  },
  reducers: {
    resetChangePasswordState: (state) => {
      state.loading = false;
      state.error = null;
      state.status = "idle";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetChangePasswordState } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
