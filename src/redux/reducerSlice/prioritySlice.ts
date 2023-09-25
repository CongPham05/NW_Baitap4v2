import { createSlice } from '@reduxjs/toolkit'
import { Priority } from '../../types';

const initialState: Priority[] = [
    {
        id: "urgent",
        content: "🌋 Urgent",
        colorId: "red"
    },
    {
        id: "high",
        content: "🏔 High",
        colorId: "brown"
    },

    {
        id: "medium",
        content: "🏕 Medium",
        colorId: "green"
    },

    {
        id: "low",
        content: "🏝 Low",
        colorId: "blue"
    }
]


export const prioritySlice = createSlice({
    name: 'priority',
    initialState,
    reducers: {
    },
})

// export const { } = prioritySlice.actions
export default prioritySlice.reducer


