import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./root.reducer";

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
});

export default store;