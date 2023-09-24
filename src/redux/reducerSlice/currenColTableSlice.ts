import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    columnId: '',
    ascending: false,
    groupType: '',
};

export const currenColTableSlice = createSlice({
    name: 'currenColTableSlice',
    initialState,
    reducers: {
        setColStatus: (state, action) => {
            const { columnId } = action.payload
            return {
                ...state,
                columnId
            }
        },
        setSortStatus: (state, action) => {
            const { columnId, ascending } = action.payload
            return {
                ...state,
                columnId: columnId,
                ascending: ascending
            }
        },
        selectGroupType: (state, action) => {
            const { columnId } = action.payload
            return {
                ...state,
                groupType: columnId,
            }
        },
    },
})

export const { setSortStatus, selectGroupType, setColStatus } = currenColTableSlice.actions
export default currenColTableSlice.reducer


