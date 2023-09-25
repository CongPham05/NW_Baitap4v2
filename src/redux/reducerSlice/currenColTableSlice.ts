import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    statusId: '',
    ascending: false,
    groupType: '',
};

export const currenColTableSlice = createSlice({
    name: 'currenColTableSlice',
    initialState,
    reducers: {
        setColStatus: (state, action) => {
            const { statusId } = action.payload
            return {
                ...state,
                statusId
            }
        },
        setSortStatus: (state, action) => {
            const { statusId, ascending } = action.payload
            return {
                ...state,
                statusId: statusId,
                ascending: ascending
            }
        },
        selectGroupType: (state, action) => {
            const { statusId } = action.payload
            return {
                ...state,
                groupType: statusId,
            }
        },
    },
})

export const { setSortStatus, selectGroupType, setColStatus } = currenColTableSlice.actions
export default currenColTableSlice.reducer


