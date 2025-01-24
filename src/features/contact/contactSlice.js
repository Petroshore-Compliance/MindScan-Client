import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendContactForm = createAsyncThunk(
    "contact/sendContactForm",
    async (FormData, thunkAPI) => {
        try {
            const response = await fetch("http://localhost:3001/contact/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(FormData),
            });

            const data = await response.json();
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue({
                    error: response.status,
                    message: data.message,
                });
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        isLoading: false,
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendContactForm.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(sendContactForm.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
            })
            .addCase(sendContactForm.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error;
            });
    }
});

export default contactSlice.reducer;