import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    register: {
        errorMessage: null,
    },
    logIn: {
        isAuthenticated: false,
        userName: null,
        errorMessage: null,
        isfetching: false,
        accessToken: null
    },
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.register.errorMessage = null;
            state.logIn.errorMessage = null;
        },
        registerStart: (state) => {
            state.register.errorMessage = null;
        },
        registerSuccess: (state) => {
            state.register.errorMessage = null;
        },
        registerFailed: (state, action) => {
            const res = action.payload;
            state.register.errorMessage = res?.response?.data?.message;
        },
        logInStart: (state) => {
            state.logIn.isfetching = true;
        },
        logInSuccess: (state, action) => {
            const res = action.payload

            state.logIn.isfetching = false;
            state.logIn.userName = res.user.userName;
            state.logIn.accessToken = res.accessToken;
            state.logIn.isAuthenticated = true;
            state.logIn.errorMessage = null;

        },
        logInFailed: (state, action) => {
            const res = action.payload;
            state.logIn.isfetching = false;
            state.logIn.errorMessage = res?.response?.data?.message;
        },
        logOut: (state) => {
            state.logIn.isAuthenticated = false;
            state.logIn.userName = null;
            state.logIn.errorMessage = null;
            state.logIn.accessToken = null;
            state.logIn.isfetching = false;
        },
    },
})

export const {
    logInStart,
    logInSuccess,
    logInFailed,
    logOut,
    registerStart,
    registerSuccess,
    registerFailed,
    resetMessage
} = authSlice.actions;
export default authSlice.reducer;