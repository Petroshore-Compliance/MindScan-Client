import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userProfile = createAsyncThunk("user/userProfile", async (userToken, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:3001/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return thunkAPI.rejectWithValue(data.message || "Error getting user profile.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ token, userData }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/user/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        return thunkAPI.rejectWithValue(data.message || "Error updating user profile.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    isLoading: false,
    error: null,
    user: {
      name: "",
      email: "",
      role: "",
      company: "",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al cargar perfil";
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al actualizar perfil";
      });
  },
});

export default userProfileSlice.reducer;
