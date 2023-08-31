import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../pages/Board/tasksSlice';
import columnsReducer from '../pages/Board/colsSlice';
import filterReducer from '../component/SearchFilters/filtersSlice'
import priorityReducer from '../component/WrapOptions/prioritySlice';
import sizeReducer from '../component/WrapOptions/sizeSlice';
import colorReducer from '../component/WrapOptions/colorOptions';


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        columns: columnsReducer,
        filters: filterReducer,

        priority: priorityReducer,
        size: sizeReducer,
        colorOption: colorReducer

    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch