import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../pages/Board/tasksSlice';
import columnsReducer from '../pages/Board/colsSlice';
import filterReducer from '../component/SearchFilters/filtersSlice'
export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        columns: columnsReducer,
        filters: filterReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch