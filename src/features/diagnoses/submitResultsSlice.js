import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitResults = createAsyncThunk(
  "diagnoses/submitResults",
  async ({ token, responses }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/diagnoses/submit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ responses }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors || data.message || "Error submitting results.");
      }

      return {
        ...data,
        httpCode: response.status,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const resultsSlice = createSlice({
  name: "results",
  initialState: {
    loading: false,
    error: null,
    status: "idle",
    success: false,
  },
  reducers: {
    resetSubmitResultsState: (state) => {
      state.loading = false;
      state.error = null;
      state.status = "idle";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitResults.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(submitResults.fulfilled, (state, action) => {
        const { httpCode } = action.payload;
        state.loading = false;
        state.status = "succeeded";
        state.success = true;
        state.code = httpCode;
      })
      .addCase(submitResults.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetSubmitResultsState } = resultsSlice.actions;
export default resultsSlice.reducer;
