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
        selectGroupType: (state, action) => {
            return {
                ...state,
                groupType: action.payload,
            }
        },
    },
})

export const { setSortStatus, selectGroupType } = dataSlice.actions
export default dataSlice.reducer


