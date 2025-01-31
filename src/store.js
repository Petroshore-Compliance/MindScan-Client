import { configureStore } from "@reduxjs/toolkit";
import forgotPasswordReducer from "./features/auth/forgotPasswordSlice.js";
import loginUserReducer from "./features/auth/loginUserSlice.js";
import loginAdminReducer from "./features/admin/loginAdminSlice.js";
import contactReducer from "./features/contact/contactSlice.js";

export const store = configureStore({
  reducer: {
    forgotPassword: forgotPasswordReducer,
    loginUser: loginUserReducer,
    loginAdmin: loginAdminReducer,
    contact: contactReducer,
    // ...
  },
});

window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
