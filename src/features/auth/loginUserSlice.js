import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, thunkAPI) => {
        try {
            const response = await fetch("http://localhost:3001/auth/login", {
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
    }
);

const loginUserSlice = createSlice({
    name: "loginUser",
    initialState: {
        user: null,
        userToken: null,
        status: "idle",
        error: null,
    },
    reducers: {
        logoutUser(state) {
            state.user = null;
            state.userToken = null;
            state.status = "idle";
            state.error = null;

            localStorage.removeItem("user");
            sessionStorage.removeItem("user");
            
            localStorage.removeItem("userToken");
            sessionStorage.removeItem("userToken");
        },
        setUserFromToken(state, action) {
            state.user = action.payload.user;
            state.userToken = action.payload.userToken;
            state.status = "succeeded";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.token;  

                if (action.meta.arg.rememberMe === true) {
                    localStorage.setItem("user", JSON.stringify(action.payload.user));
                    sessionStorage.removeItem("user");
                    localStorage.setItem("userToken", action.payload.token);
                    sessionStorage.removeItem("userToken");
                } else {
                    sessionStorage.setItem("user", JSON.stringify(action.payload.user));
                    localStorage.removeItem("user");
                    sessionStorage.setItem("userToken", action.payload.token);
                    localStorage.removeItem("userToken");
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.error || "Login error";
            });
    },
});

export const { logoutUser, setUserFromToken } = loginUserSlice.actions;
export default loginUserSlice.reducer;