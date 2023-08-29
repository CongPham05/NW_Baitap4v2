import { createSlice } from '@reduxjs/toolkit'
import { Task } from '../../types';
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';


const initialState: Task[] = [
    {
        id: "1",
        columnId: "new",
        content: "Bài 1",
        description: null,
        priority: "low",
        size: "large"
    },
    {
        id: "2",
        columnId: "new",
        content: "Bài 2",
        description: null,
        priority: "urgent",
        size: "small"
    },
    {
        id: "3",
        columnId: "inProgress",
        content: "Bài 3",
        description: null,
        priority: "high",
        size: "xLarge"
    },
    {
        id: "4",
        columnId: "inProgress",
        content: "Bài 4",
        description: null,
        priority: "medium",
        size: "mediumS"
    },
    {
        id: "5",
        columnId: "delay",
        content: "Bài 5",
        description: null,
        priority: null,
        size: "tiny"
    },
    {
        id: "6",
        columnId: "done",
        content: "Bài 6",
        description: null,
        priority: "low",
        size: null
    },

    {
        id: "8",
        columnId: "new",
        content: "Bài 8",
        description: null,
        priority: "low",
        size: "large"
    },
    {
        id: "10",
        columnId: "delay",
        content: "Bài 10",
        description: null,
        priority: "low",
        size: "large"
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
                description: null,
                priority: null,
                size: null,
            };
            state.push(newTask);
        },
        updTask: (state, action) => {
            const { id, content } = action.payload;
            return state.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        content
                    };
                }
                return task;
            });
        },
        updDesc: (state, action) => {
            const { id, description } = action.payload;
            return state.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        description
                    };
                }
                return task;
            });
        },
        delTask: (state, action) => {
            const { id } = action.payload;
            return state.filter(task => task.id !== id);
        },
        deleteAllTasksInColumn: (state, action) => {
            const { id } = action.payload;
            return state.filter((task) => task.columnId !== id);
        },

        //Action for reordering tasks within the same column
        reorderTasks: (state, action) => {
            const { activeId, overId } = action.payload;

            const activeIndex = state.findIndex((t) => t.id === activeId);
            const overIndex = state.findIndex((t) => t.id === overId);

            if (state[activeIndex].columnId !== state[overIndex].columnId) {

                const updatedTasks = state.map((task, index) => {
                    if (index === activeIndex) {
                        return { ...task, columnId: state[overIndex].columnId };
                    }
                    return task;
                });
                return arrayMove(updatedTasks, activeIndex, overIndex - 1);
            }
            return arrayMove(state, activeIndex, overIndex);
        },
        // Action for moving a task to another column
        moveTaskToColumn: (state, action) => {
            const { activeId, overId } = action.payload;
            const activeIndex = state.findIndex((t) => t.id === activeId);
            const updatedTasks = state.map((task, index) => {
                if (index === activeIndex) {
                    return { ...task, columnId: overId };
                }
                return task;
            })
            return arrayMove(updatedTasks, activeIndex, activeIndex);
        },
    },
})

export const { addTask, updTask, delTask, deleteAllTasksInColumn, moveTaskToColumn, reorderTasks, updDesc } = dataSlice.actions
export default dataSlice.reducer


