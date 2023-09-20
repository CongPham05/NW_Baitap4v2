import { createSlice } from '@reduxjs/toolkit'
import { ColorOptions } from '../types';

const initialState: ColorOptions[] = [
    {
        id: "red",
        name: "red",
        colorBorder: "#ff818266",
        colorBg: "#ffebe9",
        colorText: "#d1242f",
    },
    {
        id: "orange",
        name: "orange",
        colorBorder: "#F44336",
        colorBg: "#fff1e5",
        colorText: "#bc4c00",
    },
    {
        id: "brown",
        name: "brown",
        colorBorder: "#d4a72c66",
        colorBg: "#fff8c5",
        colorText: "#9a6700",
    },
    {
        id: "green",
        name: "green",
        colorBorder: "#4ac26b66",
        colorBg: "#dafbe1",
        colorText: "#1a7f37",
    },
    {
        id: "blue",
        name: "blue",
        colorBorder: "#54aeff66",
        colorBg: "#ddf4ff",
        colorText: "#0969da",
    },
]


export const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
    },
})

// export const { } = optionsSlice.actions
export default optionsSlice.reducer


