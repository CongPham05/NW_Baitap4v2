import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from '../redux/store'


export const todoListsSelector = (state: RootState) => state.dataList;
export const filterSearchSelector = (state: RootState) => state.filters.search;

export const todosRemainningSelector = createSelector(
    todoListsSelector,
    filterSearchSelector,
    (todoLists, searchText) => {
        return todoLists.filter(todo => {
            return todo.name.includes(searchText) ||
                String(todo.status).includes(searchText) ||
                String(todo.size).includes(searchText) ||
                String(todo.priority).includes(searchText)
        })
    }
)