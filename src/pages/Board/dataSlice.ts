import { createSlice } from '@reduxjs/toolkit'

export interface TypeData {
    id: number,
    status: null | string,
    size: null | string,
    priority: null | string,
    name: string,
}
const initialState: TypeData[] = [
    {
        id: 1,
        status: "New",
        size: "Small",
        priority: "High",
        name: "Learn Nodejs",

    },
    {
        id: 7,
        status: "Pending",
        size: "X-Large",
        priority: "Low",
        name: "Learn Nodejs 1",

    },
    {
        id: 8,
        status: 'Done',
        size: "Medium",
        priority: "Urgent",
        name: "Learn Nodejs 2",

    },

    {
        id: 2,
        status: 'New',
        size: "X-Large",
        priority: "High",
        name: "Learn Reacjs",

    },
    {
        id: 20,
        status: 'New',
        size: "Large",
        priority: "Medium",
        name: "Learn Reacjs 2",

    },
    {
        id: 66,
        status: 'Pending',
        size: "Medium",
        priority: "Medium",
        name: "Learn TypeScript 2",

    },
    {
        id: 4,
        status: "Done",
        size: "Tiny",
        priority: "Low",
        name: "Learn Nestjs",

    },
    {
        id: 46,
        status: "ReView",
        size: null,
        priority: "Urgent",
        name: "Learn Youtube",

    },
]
// const initialState: TypeData[] = []
export const dataSlice = createSlice({
    name: 'dataList',
    initialState,
    reducers: {
        addTodo: () => {

        },
    },
})

export const { addTodo } = dataSlice.actions
export default dataSlice.reducer

// get all data
// list => set lọc(status) data trùng nhau => list dataNew
// for(dataNew) => list all(nhiều list bé) sort by index
// add mới index = size + 1
// save

