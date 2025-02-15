import { configureStore } from "@reduxjs/toolkit";
import forgotPasswordReducer from "./features/auth/forgotPasswordSlice.js";
import loginUserReducer from "./features/auth/loginUserSlice.js";
import loginAdminReducer from "./features/admin/loginAdminSlice.js";
import contactReducer from "./features/contact/contactSlice.js";
import userProfileReducer from "./features/user/UserProfileSlice.js";
import companyPanelReducer from "./features/company/companyPanelSlice.js";
import changePasswordReducer from "./features/auth/changePasswordSlice.js";
import diagnosticReducer from "./features/diagnoses/getDiagnosticSlice.js";
import resultsReducer from "./features/diagnoses/submitResultsSlice.js";

export const store = configureStore({
  reducer: {
    forgotPassword: forgotPasswordReducer,
    loginUser: loginUserReducer,
    loginAdmin: loginAdminReducer,
    contact: contactReducer,
    userProfile: userProfileReducer,
    companyPanel: companyPanelReducer,
    changePassword: changePasswordReducer,
    diagnostic: diagnosticReducer,
    results: resultsReducer,
    // ...
  },
});

window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
