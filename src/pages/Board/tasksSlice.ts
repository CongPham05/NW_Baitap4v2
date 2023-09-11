import { createSlice } from '@reduxjs/toolkit'
import { Task } from '../../types';
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';


const initialState: Task[] = [
    {
        id: "1",
        columnId: "new",
        content: "Bài 1",
        description: "Xin Chào Việt Nam!",
        priorityId: "low",
        sizeId: "mediumS"
    },
    {
        id: "6",
        columnId: "done",
        content: "Bài 6",
        description: null,
        priorityId: "urgent",
        sizeId: "large"
    },
    {
        id: "3",
        columnId: "inProgress",
        content: "Bài 3",
        description: null,
        priorityId: "high",
        sizeId: "xLarge"
    },
    {
        id: "4",
        columnId: "inProgress",
        content: "Bài 4",
        description: null,
        priorityId: "medium",
        sizeId: "mediumS"
    },
    {
        id: "2",
        columnId: "new",
        content: "Bài 2",
        description: null,
        priorityId: "urgent",
        sizeId: "small"
    },
    {
        id: "5",
        columnId: "delay",
        content: "Bài 5",
        description: "medium",
        priorityId: null,
        sizeId: "tiny"
    },
    {
        id: "8",
        columnId: "new",
        content: "Bài 8",
        description: null,
        priorityId: "low",
        sizeId: "small"
    },
    {
        id: "10",
        columnId: "delay",
        content: "Bài 10",
        description: null,
        priorityId: "high",
        sizeId: "large"
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
                priorityId: null,
                sizeId: null,
            };
            state.push(newTask);
        },
        addTaskTable: (state, action) => {
            const { inputValue } = action.payload;
            const newTask: Task = {
                id: uuidv4(),
                columnId: 'new',
                content: inputValue,
                description: null,
                priorityId: null,
                sizeId: null,
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
        updCol: (state, action) => {
            const { id, newTask } = action.payload;
            return state.map((task) => (task.id === id ? newTask : task));
        },
        delTask: (state, action) => {
            const { id } = action.payload;
            return state.filter(task => task.id !== id);
        },
        deleteAllTasksInColumn: (state, action) => {
            const { id } = action.payload;
            return state.filter((task) => task.columnId !== id);
        },
        sortAscending: (state, action) => {

            if (action.payload === 'title') {
                return state.sort((a, b) => a.content.localeCompare(b.content));
            }
            if (action.payload === 'status') {
                return state.sort((a, b) => String(a.columnId).localeCompare(String(b.columnId)));
            }
            if (action.payload === 'inProgress') {
                return state.sort((a, b) => String(a.priorityId).localeCompare(String(b.priorityId)));
            }
            if (action.payload === 'size') {
                return state.sort((a, b) => String(a.sizeId).localeCompare(String(b.sizeId)));
            }

        },
        sortDescending: (state, action) => {
            if (action.payload === 'title') {
                return state.sort((a, b) => b.content.localeCompare(a.content));
            }
            if (action.payload === 'status') {
                return state.sort((a, b) => String(b.columnId).localeCompare(String(a.columnId)));
            }
            if (action.payload === 'inProgress') {
                return state.sort((a, b) => String(b.priorityId).localeCompare(String(a.priorityId)));
            }
            if (action.payload === 'size') {
                return state.sort((a, b) => String(b.sizeId).localeCompare(String(a.sizeId)));
            }
        },
        sortDefault: (state) => {
            return state;
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

export const
    {
        addTask,
        updTask,
        delTask,
        updCol,
        addTaskTable,
        deleteAllTasksInColumn,
        moveTaskToColumn,
        sortAscending,
        sortDescending,
        sortDefault,
        reorderTasks,
        updDesc
    }
        = dataSlice.actions
export default dataSlice.reducer


