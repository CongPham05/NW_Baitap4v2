import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from '../redux/store'


export const tasksSelector = (state: RootState) => state.tasks;
export const colsSelector = (state: RootState) => state.columns;
export const filterSearchSelector = (state: RootState) => state.filters.search;

export const todosRemainningSelector = createSelector(
    tasksSelector,
    colsSelector,
    filterSearchSelector,
    (todoLst, colsLst, searchText) => {
        return todoLst.filter(todo => {
            const columnTitle = colsLst.find(column => column.id === todo.columnId)?.title || "";
            return todo.content.includes(searchText) || columnTitle.includes(searchText);
        });
    }
)