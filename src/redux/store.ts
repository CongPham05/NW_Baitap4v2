import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../pages/Board/dataSlice';
import filterReducer from '../component/SearchFilters/filtersSlice'
export const store = configureStore({
    reducer: {
        dataList: dataReducer,
        filters: filterReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch