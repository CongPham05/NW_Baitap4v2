import { createSlice } from '@reduxjs/toolkit'
import { Column } from '../../types';


const initialState: Column[] = [
    {
        id: "new",
        title: "New",
    },
    {
        id: "inProgress",
        title: "In progress",
    },
    {
        id: 'delay',
        title: "Delay"
    },
    {
        id: "done",
        title: "Done",
    },
];
export const dataSlice = createSlice({
    name: 'cols',
    initialState,
    reducers: {
        addCols: () => {

        },
    },
})

export const { addCols } = dataSlice.actions
export default dataSlice.reducer


