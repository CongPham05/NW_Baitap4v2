import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from '../redux/store'


export const prioritySelector = (state: RootState) => state.priority;
export const sizeSelector = (state: RootState) => state.size;
export const colorOptionSelector = (state: RootState) => state.colorOption;
export const dataSelector = (state: RootState) => state.data;

export const tasksSelector = (state: RootState) => state.tasks;
export const colsSelector = (state: RootState) => state.columns;
export const filterSearchSelector = (state: RootState) => state.filters.search;

export const todosRemainningSelector = createSelector(
    tasksSelector,
    colsSelector,
    prioritySelector,
    sizeSelector,
    filterSearchSelector,

    (todoLst, colsLst, priority, size, searchText) => {
        return todoLst.filter(todo => {
            const columnTitle = colsLst.find(column => column.id === todo.columnId)?.title || "";
            const priorityTitle = priority.find(item => item.id === todo.priorityId)?.title || "";
            const sizeTitle = size.find(item => item.id === todo.sizeId)?.title || "";


            return todo.content.includes(searchText) ||
                columnTitle.includes(searchText) ||
                priorityTitle.includes(searchText) ||
                sizeTitle.includes(searchText)
        });
    }
)