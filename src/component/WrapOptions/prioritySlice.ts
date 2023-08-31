import { createSlice } from '@reduxjs/toolkit'
import { Priority } from '../../types';

const initialState: Priority[] = [
    {
        id: "urgent",
        title: "🌋 Urgent",
        colorId: "red"
    },
    {
        id: "high",
        title: "🏔 High",
        colorId: "brown"
    },

    {
        id: "medium",
        title: "🏕 Medium",
        colorId: "green"
    },

    {
        id: "low",
        title: "🏝 Low",
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


