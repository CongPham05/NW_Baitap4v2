import { createSlice } from '@reduxjs/toolkit'
import { PropTasks, Task } from '../../types';
import { arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from 'uuid';

const initialState: PropTasks = {
    defaultTaskList: [{
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
        description: undefined,
        priorityId: "urgent",
        sizeId: "large"
    },
    {
        id: "3",
        columnId: "inProgress",
        content: "Bài 3",
        description: undefined,
        priorityId: "high",
        sizeId: "xLarge"
    },
    {
        id: "4",
        columnId: "inProgress",
        content: "Bài 4",
        description: undefined,
        priorityId: "medium",
        sizeId: "mediumS"
    },
    {
        id: "2",
        columnId: "new",
        content: "Bài 2",
        description: undefined,
        priorityId: "urgent",
        sizeId: "small"
    },
    {
        id: "5",
        columnId: "delay",
        content: "Bài 5",
        description: "medium",
        priorityId: undefined,
        sizeId: "tiny"
    },
    {
        id: "8",
        columnId: "new",
        content: "Bài 8",
        description: undefined,
        priorityId: "low",
        sizeId: "small"
    },
    {
        id: "10",
        columnId: "delay",
        content: "Bài 10",
        description: undefined,
        priorityId: "high",
        sizeId: "large"
    },],
    taskList: [{
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
        description: undefined,
        priorityId: "urgent",
        sizeId: "large"
    },
    {
        id: "3",
        columnId: "inProgress",
        content: "Bài 3",
        description: undefined,
        priorityId: "high",
        sizeId: "xLarge"
    },
    {
        id: "4",
        columnId: "inProgress",
        content: "Bài 4",
        description: undefined,
        priorityId: "medium",
        sizeId: "mediumS"
    },
    {
        id: "2",
        columnId: "new",
        content: "Bài 2",
        description: undefined,
        priorityId: "urgent",
        sizeId: "small"
    },
    {
        id: "5",
        columnId: "delay",
        content: "Bài 5",
        description: "medium",
        priorityId: undefined,
        sizeId: "tiny"
    },
    {
        id: "8",
        columnId: "new",
        content: "Bài 8",
        description: undefined,
        priorityId: "low",
        sizeId: "small"
    },
    {
        id: "10",
        columnId: "delay",
        content: "Bài 10",
        description: undefined,
        priorityId: "high",
        sizeId: "large"
    },],
}
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTaskTable: (state, action) => {
            const { inputValue } = action.payload;
            const newTask: Task = {
                id: uuidv4(),
                columnId: 'new',
                content: inputValue,
                description: undefined,
                priorityId: undefined,
                sizeId: undefined,
            };
            state.taskList.push(newTask);
            state.defaultTaskList.push(newTask);
            return state;
        },
        addTaskTitleGroup: (state, action) => {
            const { columnId, priorityId, sizeId, content } = action.payload;
            const newTask: Task = {
                id: uuidv4(),
                columnId,
                content,
                description: undefined,
                priorityId,
                sizeId,
            };
            state.taskList.push(newTask);
            state.defaultTaskList.push(newTask);
            return state;
        },
        addTask: (state, action) => {
            const { columnId, inputValue } = action.payload;
            const newTask: Task = {
                id: uuidv4(),
                columnId,
                content: inputValue,
                description: undefined,
                priorityId: undefined,
                sizeId: undefined,
            };
            state.taskList.push(newTask);
            state.defaultTaskList.push(newTask);
            return state;
        },
        updTask: (state, action) => {
            const { id, content } = action.payload;
            const updatedTaskList = state.taskList.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        content
                    };
                }
                return task;
            });
            const updatedDefaultTaskList = state.defaultTaskList.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        content
                    };
                }
                return task;
            });
            return {
                ...state,
                taskList: updatedTaskList,
                defaultTaskList: updatedDefaultTaskList
            };
        },

        updDesc: (state, action) => {
            const { id, description } = action.payload;

            const updatedTaskList = state.taskList.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        description
                    };
                }
                return task;
            });

            const updatedDefaultTaskList = state.defaultTaskList.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        description
                    };
                }
                return task;
            });

            return {
                ...state,
                taskList: updatedTaskList,
                defaultTaskList: updatedDefaultTaskList
            };
        },

        updCol: (state, action) => {
            const { id, newTask } = action.payload;
            const newTaskLst = state.taskList.map((task) => (task.id === id ? newTask : task));
            const newDefaultTaskLst = state.defaultTaskList.map((task) => (task.id === id ? newTask : task));
            return {
                ...state,
                defaultTaskList: newDefaultTaskLst,
                taskList: newTaskLst
            };
        },
        delTask: (state, action) => {
            const { id } = action.payload;
            const newTaskLst = state.taskList.filter(task => task.id !== id);
            const newDefaultTaskLst = state.defaultTaskList.filter(task => task.id !== id);
            return {
                ...state,
                defaultTaskList: newDefaultTaskLst,
                taskList: newTaskLst
            };
        },
        deleteAllTasksInColumn: (state, action) => {
            const { id } = action.payload;
            const newTaskLst = state.taskList.filter((task) => task.columnId !== id);
            const newDefaultTaskLst = state.defaultTaskList.filter((task) => task.columnId !== id);
            return {
                ...state,
                defaultTaskList: newDefaultTaskLst,
                taskList: newTaskLst
            };
        },
        sortTable: (state, action) => {
            const { columnId, ascending } = action.payload;
            const sortedTasks = [...state.taskList].sort((a, b) => {
                if (columnId === 'title') {
                    return ascending ? a.content.localeCompare(b.content) : b.content.localeCompare(a.content);
                } else if (columnId === 'status') {
                    return ascending
                        ? String(a.columnId).localeCompare(String(b.columnId))
                        : String(b.columnId).localeCompare(String(a.columnId));
                } else if (columnId === 'inProgress') {
                    return ascending
                        ? String(a.priorityId).localeCompare(String(b.priorityId))
                        : String(b.priorityId).localeCompare(String(a.priorityId));
                } else if (columnId === 'size') {
                    return ascending
                        ? String(a.sizeId).localeCompare(String(b.sizeId))
                        : String(b.sizeId).localeCompare(String(a.sizeId));
                }
                return 0;
            });
            state.taskList = sortedTasks;
            return state
        },
        //Action for reordering tasks within the same column
        reorderTasks: (state, action) => {
            const { activeId, overId } = action.payload;

            const activeIndex = state.taskList.findIndex((t) => t.id === activeId);
            const overIndex = state.taskList.findIndex((t) => t.id === overId);

            if (state.taskList[activeIndex].columnId !== state.taskList[overIndex].columnId) {

                const updatedTasks = state.taskList.map((task, index) => {
                    if (index === activeIndex) {
                        return { ...task, columnId: state.taskList[overIndex].columnId };
                    }
                    return task;
                });

                state.taskList = arrayMove(updatedTasks, activeIndex, overIndex - 1);
                state.defaultTaskList = arrayMove(updatedTasks, activeIndex, overIndex - 1);
            }
            state.taskList = arrayMove(state.taskList, activeIndex, overIndex);
            state.defaultTaskList = arrayMove(state.taskList, activeIndex, overIndex);
            return state;
        },
        // Action for moving a task to another column
        moveTaskToColumn: (state, action) => {
            const { activeId, overId } = action.payload;
            const activeIndex = state.taskList.findIndex((t) => t.id === activeId);
            const updatedTasks = state.taskList.map((task, index) => {
                if (index === activeIndex) {
                    return { ...task, columnId: overId };
                }
                return task;
            })
            state.taskList = arrayMove(updatedTasks, activeIndex, activeIndex);
            state.defaultTaskList = arrayMove(updatedTasks, activeIndex, activeIndex);
            return state;
        },

    },
})

export const
    {
        addTaskTitleGroup,
        addTask,
        updTask,
        delTask,
        updCol,
        addTaskTable,
        deleteAllTasksInColumn,
        moveTaskToColumn,
        reorderTasks,
        updDesc,
        sortTable,
    }
        = tasksSlice.actions
export default tasksSlice.reducer


