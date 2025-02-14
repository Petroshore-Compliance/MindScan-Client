import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:3001/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors || data.message || "Error sending email.");
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async ({ token, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/auth/set-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Error setting new password.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    status: "idle",
    success: false,
  },
  reducers: {
    resetForgotState: (state) => {
      state.loading = false;
      state.error = null;
      state.status = "idle";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        state.success = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(setNewPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
        state.success = false;
      })
      .addCase(setNewPassword.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
        state.success = true;
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetForgotState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
