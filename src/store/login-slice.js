import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userId: 0,
    roleName: "",
};

const loginSlice = createSlice({
    name: "loginSlice",
    initialState: initialState,
    reducers: {
        setUserId: (state, {payload}) => {
            state.userId = payload.userId;
            state.roleName = payload.roleName;
        },
    },
});

export default loginSlice;
