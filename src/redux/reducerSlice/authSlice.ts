import { createSlice } from '@reduxjs/toolkit'
import { PropUser } from '../../types';


const initialState: PropUser = {
    id: undefined,
    userName: undefined,
    email: undefined
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fetchDataAuth: (state, action) => {
            const { auth } = action.payload;
            state = auth;
            return state;

        },
        updateUser: (state, action) => {
            const { auth } = action.payload;

            state = auth
            return state;
        },
        resetUser: (state) => {

            state = {
                id: undefined,
                userName: undefined,
                email: undefined
            };
            return state;
        },
    },
})

export const { fetchDataAuth, updateUser, resetUser } = authSlice.actions
export default authSlice.reducer


