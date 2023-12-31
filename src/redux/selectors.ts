import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from '../redux/store'


export const loadingSelector = (state: RootState) => state.loadingGlobal.status;
export const themSelector = (state: RootState) => state.theme.status;

export const prioritySelector = (state: RootState) => state.priority;
export const sizeSelector = (state: RootState) => state.size;
export const colorOptionSelector = (state: RootState) => state.colorOption;

export const dataSelector = (state: RootState) => state.data;
export const colIdSelector = (state: RootState) => state.data.statusId;
export const colIdGroupActive = (state: RootState) => state.data.groupType;

export const statusIconSelector = (state: RootState) => state.statusIconsTable;

export const tasksSelector = (state: RootState) => state.tasks;
export const authSelector = (state: RootState) => state.auth;
export const userSelector = (state: RootState) => state.user;
export const usersBoardSelector = (state: RootState) => state.usersBoard;
export const colsSelector = (state: RootState) => state.columns;
export const filterSearchSelector = (state: RootState) => state.filters.search;

export const todosRemainningSelector = createSelector(
    tasksSelector,
    colsSelector,
    prioritySelector,
    sizeSelector,
    filterSearchSelector,

    (tasksList, colsLst, priority, size, searchText) => {
        return tasksList.taskList.filter(task => {

            const columnTitle = colsLst.find(column => column.id === task.statusId)?.content || "";
            const priorityTitle = priority.find(item => item.id === task.priorityId)?.content || "";
            const sizeTitle = size.find(item => item.id === task.sizeId)?.content || "";


            return task.content.includes(searchText) ||
                columnTitle.includes(searchText) ||
                priorityTitle.includes(searchText) ||
                sizeTitle.includes(searchText)
        });
    }
)