import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    columnId: '',
    ascending: false,
    groupType: ''
};

export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState,
    reducers: {
        setSortStatus: (state, action) => {
            const { columnId, ascending } = action.payload
            return {
                ...state,
                columnId: columnId,
                ascending: ascending
            }
        },
        setDefaultSortTable: (state, action) => {
            console.log('setDefaultSortTable')
            return {
                ...state,
                columnId: action.payload
            }
        },
        selectGroupType: (state, action) => {
            return {
                ...state,
                groupType: action.payload,
            }
        },
    },
})

export const { setSortStatus, selectGroupType, setDefaultSortTable } = dataSlice.actions
export default dataSlice.reducer


