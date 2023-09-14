import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: {
        isArrowUp: null,
        isArrowDown: null,
        isGroup: null
    },
    status: {
        isArrowUp: null,
        isArrowDown: null,
        isGroup: null,
    },
    inProgress: {
        isArrowUp: null,
        isArrowDown: null,
        isGroup: null,
    },
    size: {
        isArrowUp: null,
        isArrowDown: null,
        isGroup: null,
    },

};

export const statusIconsSlice = createSlice({
    name: 'statusIconsSlice',
    initialState,
    reducers: {
        updateStatusIcon: (state, action) => {
            console.log("check");

            // const { columnId, ascending } = action.payload
            // return {
            //     ...state,
            //     columnId: columnId,
            //     ascending: ascending
            // }
        },

    },
})

export const { updateStatusIcon } = statusIconsSlice.actions
export default statusIconsSlice.reducer


