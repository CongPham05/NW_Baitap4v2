import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeActive: (state) => {
            state.status = !state.status
            return state;
        },
    },
})

export const { themeActive } = themeSlice.actions
export default themeSlice.reducer


