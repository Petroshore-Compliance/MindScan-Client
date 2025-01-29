import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginAdmin = createAsyncThunk("admin/loginAdmin", async (credentials, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:3001/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error logging in");
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const loginAdminSlice = createSlice({
  name: "loginAdmin",
  initialState: {
    admin: null,
    adminToken: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutAdmin(state) {
      state.admin = null;
      state.adminToken = null;
      state.status = "idle";
      state.error = null;

      sessionStorage.removeItem("admin");
      sessionStorage.removeItem("adminToken");
    },
    setAdminFromToken(state, action) {
      state.admin = action.payload.admin;
      state.adminToken = action.payload.adminToken;
      state.status = "succeeded";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload.admin;
        state.adminToken = action.payload.token;

        sessionStorage.setItem("admin", JSON.stringify(action.payload.admin));
        sessionStorage.setItem("adminToken", action.payload.token);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error || "Login error";
      });
  },
});

export const { logoutAdmin, setAdminFromToken } = loginAdminSlice.actions;
export default loginAdminSlice.reducer;
