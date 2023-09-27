import { createSlice } from '@reduxjs/toolkit'
import { Column } from '../../types';
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';

const initialState: Column[] = [
    {
        id: "new",
        content: "New",
        colorId: "blue"
    },
    {
        id: "inProgress",
        content: "In progress",
        colorId: "brown"
    },
    {
        id: 'delay',
        content: "Delay",
        colorId: "red"
    },
    {
        id: "done",
        content: "Done",
        colorId: "green"
    },
];
// const initialState: Column[] = [
//     {
//         id: 1,
//         content: "New",
//         colorId: "blue"
//     },
//     {
//         id: 2,
//         content: "In progress",
//         colorId: "brown"
//     },
//     {
//         id: 3,
//         content: "Delay",
//         colorId: "red"
//     },
//     {
//         id: 4,
//         content: "Done",
//         colorId: "green"
//     },
// ];
export const dataSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        addColumn: (state) => {
            const columnToAdd = {
                id: uuidv4(),
                content: `Column ${state.length + 1}`,
                colorId: "blue",
            };
            state.push(columnToAdd);
        },
        updateCol: (state, action) => {
            const { id, content } = action.payload;
            return state.map((col) => {
                if (col.id !== id) return col;
                return { ...col, content };
            });
        },
        deleteCol: (state, action) => {
            const { id } = action.payload;
            return state.filter((col) => col.id !== id);
        },
        moveColumn: (state, action) => {
            const { activeId, overId } = action.payload;
            const activeColumnIndex = state.findIndex((col) => col.id === activeId);
            const overColumnIndex = state.findIndex((col) => col.id === overId);
            return arrayMove(state, activeColumnIndex, overColumnIndex);
        }
    },
})

export const { addColumn, updateCol, deleteCol, moveColumn } = dataSlice.actions
export default dataSlice.reducer


