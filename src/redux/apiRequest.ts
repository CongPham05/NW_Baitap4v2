import axios from "axios"
import { logInFailed, logInStart, logInSuccess, logOut, registerFailed, registerStart, registerSuccess } from "./authSlice"
import { BASE_URL } from "../utils/config";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

export const registerUser = async (credentials: { email: null; userName: null; password: null; }, dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) => {
    dispatch(registerStart());
    try {
        const response = await axios.post(`${BASE_URL}auth/register`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        dispatch(registerSuccess(response.data));
        navigate('/login');

    } catch (error) {
        dispatch(registerFailed(error));
    }
}
export const loginUser = async (credentials: { email: undefined; password: undefined; }, dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) => {
    dispatch(logInStart());
    try {
        const response = await axios.post(`${BASE_URL}auth/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        dispatch(logInSuccess(response.data));
        navigate('/board');

    } catch (error) {
        dispatch(logInFailed(error));
    }
}
export const logOutUser = async (dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) => {
    dispatch(logOut());
    navigate('/login');
}

