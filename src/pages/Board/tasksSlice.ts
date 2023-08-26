import { createSlice } from '@reduxjs/toolkit'
import { Task } from '../../types';
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';


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
        addTask: (state, action) => {
            const { columnId, inputValue } = action.payload;
            const newTask: Task = {
                id: uuidv4(),
                columnId,
                content: inputValue,
            };
            state.push(newTask);
        },
        updateTask: () => {

        },
        delTask: (state, action) => {
            const { id } = action.payload;
            return state.filter(task => task.id !== id);

        },
        deleteAllTasksInColumn: (state, action) => {
            const { id } = action.payload;
            return state.filter((task) => task.columnId !== id);
        },

        // Action for reordering tasks within the same column
        reorderTasks: (state, action) => {
            const { activeId, overId } = action.payload;
            const activeIndex = state.findIndex((t) => t.id === activeId);
            const overIndex = state.findIndex((t) => t.id === overId);
            console.log("DRAG TASK END IN COL");

            // if (state[activeIndex].columnId != state[overIndex].columnId) {
            //     state[activeIndex].columnId = state[overIndex].columnId;
            //     return arrayMove(state, activeIndex, overIndex - 1);
            // }
            return arrayMove(state, activeIndex, overIndex);
        },

        // Action for moving a task to another column
        moveTaskToColumn: (state, action) => {
            const { activeId, overId } = action.payload;
            const activeIndex = state.findIndex((t) => t.id === activeId);
            state[activeIndex].columnId = overId;
            console.log("DROPPING TASK OVER COLUMN", { activeIndex });
            return arrayMove(state, activeIndex, activeIndex);
        },
    },
})

export const { addTask, updateTask, delTask, deleteAllTasksInColumn, moveTaskToColumn, reorderTasks } = dataSlice.actions
export default dataSlice.reducer


