import { createSlice } from '@reduxjs/toolkit'
import { Task } from '../../types';


const initialState: Task[] = [
    {
        id: "1",
        columnId: "new",
        content: "Bài 1",

    },
    {
        id: "2",
        columnId: "new",
        content:
            "Bài 2",
    },
    {
        id: "3",
        columnId: "inProgress",
        content: "Bài 3",
    },
    {
        id: "4",
        columnId: "inProgress",
        content: "Bài 4",
    },
    {
        id: "5",
        columnId: "done",
        content: "Bài 5",
    },
    {
        id: "6",
        columnId: "done",
        content: "Bài 6",
    },

    {
        id: "8",
        columnId: "new",
        content: "Bài 8",
    },
    {
        id: "10",
        columnId: "delay",
        content: "Bài 10",
    },
    {
        id: "11",
        columnId: "delay",
        content: "Bài 11",
    },

];
export const dataSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTodo: () => {

        },
    },
})

export const { addTodo } = dataSlice.actions
export default dataSlice.reducer


