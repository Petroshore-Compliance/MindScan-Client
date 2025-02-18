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
      return thunkAPI.rejectWithValue(data.errors || data.message || "Error fetching company data");
    }

    const data = await response.json();
    return data.company;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchEmployees = createAsyncThunk("company/fetchEmployees", async (_, { rejectWithValue }) => {
  const token = sessionStorage.getItem("userToken") ?? localStorage.getItem("userToken");

  try {
    const response = await fetch("http://localhost:3001/companies/get-employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data.errors || data.message || "Error fetching employees data");
    }

    const data = await response.json();
    return data.employees;
  } catch (error) {
    return rejectWithValue(error.message);
  } 
});

export const inviteEmployee = createAsyncThunk("company/inviteEmployee", async ({email, role }, { rejectWithValue, getState }) => {
  const token = sessionStorage.getItem("userToken") ?? localStorage.getItem("userToken");

  const company = getState().companyPanel.company;

  if (!company) {
    return rejectWithValue("Company data not available");
  }
  try {
    const response = await fetch("http://localhost:3001/companies/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        host : company.email,
        guest : email, 
        neededRole: "manager",
        role: role,
        company_id: company.company_id,}),
    });

    if (!response.ok) {
      const data = await response.json();

      return rejectWithValue(data.errors || data.message || "Error inviting employee");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


const companyPanelSlice = createSlice({
  name: "companyPanel",
  initialState: {
    company: null,
    employees: [],
    isLoading: false,
    employeesLoading: false,
    error: null,
    employeesError: null,
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
      })

      // Fetch Employees Cases
      .addCase(fetchEmployees.pending, (state) => {
        state.employeesLoading = true;
        state.employeesError = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employeesLoading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.employeesLoading = false;
        state.employeesError = action.payload;
      });
  },
});

export default companyPanelSlice.reducer;
