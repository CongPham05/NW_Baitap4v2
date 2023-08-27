import { createSlice } from '@reduxjs/toolkit'
import { Column } from '../../types';
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';

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
    name: 'columns',
    initialState,
    reducers: {
        addColumn: (state) => {
            const columnToAdd = {
                id: uuidv4(),
                title: `Column ${state.length + 1}`,
            };
            state.push(columnToAdd);
        },
        updateCol: (state, action) => {
            const { id, title } = action.payload;
            return state.map((col) => {
                if (col.id !== id) return col;
                return { ...col, title };
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


