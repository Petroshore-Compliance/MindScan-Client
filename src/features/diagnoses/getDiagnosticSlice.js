import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getDiagnostic = createAsyncThunk(
  "diagnoses/getDiagnostic",
  async ({ language, token }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/diagnoses/launch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ language }),
      });

      const data = await response.json();

      if (response.status === 409) {
        return thunkAPI.fulfillWithValue({
          httpCode: 409,
          message: data.message || "Diagnosis finished",
        });
      }

      if (!response.ok) {
        throw new Error(data.errors || data.message || "Error fetching diagnostic.");
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

const diagnosticSlice = createSlice({
  name: "diagnostic",
  initialState: {
    loading: false,
    error: null,
    status: "idle",
    diagnostic: null,
  },
  reducers: {
    resetDiagnosticState: (state) => {
      state.loading = false;
      state.error = null;
      state.status = "idle";
      state.diagnostic = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiagnostic.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getDiagnostic.fulfilled, (state, action) => {
        if (action.payload.httpCode === 409) {
          state.loading = false;
          state.status = "succeeded";
          state.code = 409;
          state.diagnostic = { message: action.payload.message };
          return;
        }

        const { httpCode, message, questions, page } = action.payload;
        state.loading = false;
        state.status = "succeeded";
        state.code = httpCode;
        state.diagnostic = { message, questions, page };
      })
      .addCase(getDiagnostic.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetDiagnosticState } = diagnosticSlice.actions;
export default diagnosticSlice.reducer;
