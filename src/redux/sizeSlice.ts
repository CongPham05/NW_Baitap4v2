import { createSlice } from '@reduxjs/toolkit'
import { Size } from '../types';

const initialState: Size[] = [
    {
        id: "xLarge",
        title: "🐋 X-Large",
        colorId: "red"
    },
    {
        id: "large",
        title: "🦑 Large",
        colorId: "orange"
    },
    {
        id: "mediumS",
        title: "🐂 Medium",
        colorId: "brown"
    },
    {
        id: "small",
        title: "🐇 Small",
        colorId: "green"
    },
    {
        id: "tiny",
        title: "🦔 Tiny",
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


