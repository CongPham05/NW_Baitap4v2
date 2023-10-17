import { createSlice } from '@reduxjs/toolkit'
import { PropUser } from '../../types';


const initialState: PropUser[] = [];

export const listUserSlice = createSlice({
    name: 'listUser',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            const { dataUser } = action.payload;
            state = dataUser
            return state;
        },
    },
})

export const { getUsers } = listUserSlice.actions
export default listUserSlice.reducer


