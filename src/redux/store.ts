import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import tasksReducer from './reducerSlice/tasksSlice';
import columnsReducer from './reducerSlice/colsSlice';
import filterReducer from '../component/SearchFilters/filtersSlice'
import priorityReducer from './reducerSlice/prioritySlice';
import sizeReducer from './reducerSlice/sizeSlice';
import colorReducer from './reducerSlice/colorSlice';
import dataReducer from './reducerSlice/currenColTableSlice'
import statusIconsSlice from './reducerSlice/statusIconsSlice';
import loadingReducer from './reducerSlice/loadingSlice';
import themeReducer from './reducerSlice/themeSlice';
import authReducer from './reducerSlice/authSlice';
import userReducer from './reducerSlice/listUserSlice';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    theme: themeReducer,
    loadingGlobal: loadingReducer,
    data: dataReducer,
    tasks: tasksReducer,
    columns: columnsReducer,
    filters: filterReducer,
    statusIconsTable: statusIconsSlice,
    priority: priorityReducer,
    size: sizeReducer,
    colorOption: colorReducer,

})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


