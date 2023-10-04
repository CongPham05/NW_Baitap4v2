import { createSlice } from '@reduxjs/toolkit'
import { PropTasks, Task } from '../../types';
import { arrayMove } from "@dnd-kit/sortable";

const initialState: PropTasks = {
    defaultTaskList: [],
    taskList: [],
    // defaultTaskList: [
    //     {
    //         id: 1,
    //         statusId: "new",
    //         content: "Bài 1",
    //         description: "Xin Chào Việt Nam!",
    //         priorityId: "low",
    //         sizeId: "mediumS"
    //     },
    //     {
    //         id: 2,
    //         statusId: "done",
    //         content: "Bài 6",
    //         description: undefined,
    //         priorityId: "urgent",
    //         sizeId: "large"
    //     },

    //     {
    //         id: 3,
    //         statusId: "inProgress",
    //         content: "Bài 3",
    //         description: undefined,
    //         priorityId: "high",
    //         sizeId: "xLarge"
    //     },
    //     {
    //         id: 4,
    //         statusId: "inProgress",
    //         content: "Bài 4",
    //         description: undefined,
    //         priorityId: "medium",
    //         sizeId: "mediumS"
    //     },
    //     {
    //         id: 5,
    //         statusId: "new",
    //         content: "Bài 2",
    //         description: undefined,
    //         priorityId: "urgent",
    //         sizeId: "small"
    //     },
    //     {
    //         id: 6,
    //         statusId: "delay",
    //         content: "Bài 5",
    //         description: "medium",
    //         priorityId: undefined,
    //         sizeId: "tiny"
    //     },
    //     {
    //         id: 7,
    //         statusId: "new",
    //         content: "Bài 8",
    //         description: undefined,
    //         priorityId: "low",
    //         sizeId: "small"
    //     },
    //     {
    //         id: 8,
    //         statusId: "delay",
    //         content: "Bài 10",
    //         description: undefined,
    //         priorityId: "high",
    //         sizeId: "large"
    //     }
    // ],
    // taskList: [
    //     {
    //         id: 1,
    //         statusId: "new",
    //         content: "Bài 1",
    //         description: "Xin Chào Việt Nam!",
    //         priorityId: "low",
    //         sizeId: "mediumS"
    //     },

    //     {
    //         id: 2,
    //         statusId: "done",
    //         content: "Bài 6",
    //         description: undefined,
    //         priorityId: "urgent",
    //         sizeId: "large"
    //     },

    //     {
    //         id: 3,
    //         statusId: "inProgress",
    //         content: "Bài 3",
    //         description: undefined,
    //         priorityId: "high",
    //         sizeId: "xLarge"
    //     },
    //     {
    //         id: 4,
    //         statusId: "inProgress",
    //         content: "Bài 4",
    //         description: undefined,
    //         priorityId: "medium",
    //         sizeId: "mediumS"
    //     },
    //     {
    //         id: 5,
    //         statusId: "new",
    //         content: "Bài 2",
    //         description: undefined,
    //         priorityId: "urgent",
    //         sizeId: "small"
    //     },
    //     {
    //         id: 6,
    //         statusId: "delay",
    //         content: "Bài 5",
    //         description: "medium",
    //         priorityId: undefined,
    //         sizeId: "tiny"
    //     },
    //     {
    //         id: 7,
    //         statusId: "new",
    //         content: "Bài 8",
    //         description: undefined,
    //         priorityId: "low",
    //         sizeId: "small"
    //     },
    //     {
    //         id: 8,
    //         statusId: "delay",
    //         content: "Bài 10",
    //         description: undefined,
    //         priorityId: "high",
    //         sizeId: "large"
    //     }
    // ]
}
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        fetchTodoList: (state, action) => {
            const { dataList } = action.payload;
            state.defaultTaskList = dataList;
            state.taskList = dataList;
            return state;

        },
        addTaskTable: (state, action) => {
            const { idTodo, inputValue } = action.payload;
            const newTask: Task = {
                id: idTodo,
                statusId: 'new',
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
            const { idTodo, statusId, priorityId, sizeId, content } = action.payload;

            const newTask: Task = {
                id: idTodo,
                statusId,
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
            const { id, statusId, content } = action.payload;
            const newTask: Task = {
                id,
                statusId,
                content,
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
            const newTaskLst = state.taskList.filter((task) => task.statusId !== id);
            const newDefaultTaskLst = state.defaultTaskList.filter((task) => task.statusId !== id);
            return {
                ...state,
                defaultTaskList: newDefaultTaskLst,
                taskList: newTaskLst
            };
        },
        sortTable: (state, action) => {
            const { statusId, ascending } = action.payload;
            const sortedTasks = [...state.taskList].sort((a, b) => {
                if (statusId === 'content') {
                    return ascending ? a.content.localeCompare(b.content) : b.content.localeCompare(a.content);
                } else if (statusId === 'status') {
                    return ascending
                        ? String(a.statusId).localeCompare(String(b.statusId))
                        : String(b.statusId).localeCompare(String(a.statusId));
                } else if (statusId === 'inProgress') {
                    return ascending
                        ? String(a.priorityId).localeCompare(String(b.priorityId))
                        : String(b.priorityId).localeCompare(String(a.priorityId));
                } else if (statusId === 'size') {
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

            if (state.taskList[activeIndex].statusId !== state.taskList[overIndex].statusId) {

                const updatedTasks = state.taskList.map((task, index) => {
                    if (index === activeIndex) {
                        return { ...task, statusId: state.taskList[overIndex].statusId };
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
                    return { ...task, statusId: overId };
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
        fetchTodoList,
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


