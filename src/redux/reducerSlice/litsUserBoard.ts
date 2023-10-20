import { createSlice } from '@reduxjs/toolkit'
import { PropUserBoard } from '../../types';


const initialState: PropUserBoard[] = [];

export const listUserBoard = createSlice({
    name: 'listUserBoard',
    initialState,
    reducers: {
        getUserBoard: (state, action) => {
            const { updatedUsers } = action.payload;
            state = updatedUsers
            return state;
        },
    },
})

export const { getUserBoard } = listUserBoard.actions
export default listUserBoard.reducer


