import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCompany = createAsyncThunk("company/fetchCompany", async (_, { rejectWithValue }) => {
  const token = sessionStorage.getItem("userToken") ?? localStorage.getItem("userToken");

  try {
    const response = await fetch("http://localhost:3001/companies/get-company", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching company data");
    }

    const data = await response.json();
    return data.company;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const companyPanelSlice = createSlice({
  name: "companyPanel",
  initialState: {
    company: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default companyPanelSlice.reducer;
