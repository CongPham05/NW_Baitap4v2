import { createSlice } from '@reduxjs/toolkit'
import { Size } from '../../types';

const initialState: Size[] = [
    {
        id: "xLarge",
        content: "🐋 X-Large",
        colorId: "red"
    },
    {
        id: "large",
        content: "🦑 Large",
        colorId: "orange"
    },
    {
        id: "mediumS",
        content: "🐂 Medium",
        colorId: "brown"
    },
    {
        id: "small",
        content: "🐇 Small",
        colorId: "green"
    },
    {
        id: "tiny",
        content: "🦔 Tiny",
        colorId: "blue"
    },
]


export const sizeSlice = createSlice({
    name: 'size',
    initialState,
    reducers: {
    },
})

// export const { } = sizeSlice.actions
export default sizeSlice.reducer


