import {combineReducers} from "@reduxjs/toolkit";
import loginSlice from "./login-slice";

const rootReducer = combineReducers({
    loginSlice: loginSlice.reducer
});

export default rootReducer;