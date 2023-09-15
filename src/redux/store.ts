import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice';
import columnsReducer from './colsSlice';
import filterReducer from '../component/SearchFilters/filtersSlice'
import priorityReducer from '../component/WrapOptions/prioritySlice';
import sizeReducer from '../component/WrapOptions/sizeSlice';
import colorReducer from '../component/WrapOptions/colorSlice';
import dataReducer from './currenColTableSlice'
import statusIconsSlice from './statusIconsSlice';


export const store = configureStore({
    reducer: {
        data: dataReducer,
        tasks: tasksReducer,
        columns: columnsReducer,
        filters: filterReducer,
        statusIconsTable: statusIconsSlice,
        priority: priorityReducer,
        size: sizeReducer,
        colorOption: colorReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch