import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        controlLoading: (state, action) => {
            state.status = action.payload;
            return state;
        },
    },
})

export const { controlLoading } = loadingSlice.actions
export default loadingSlice.reducer


