import { createSlice } from '@reduxjs/toolkit'

interface search {
    search: string
}
const initialState: search = {
    search: "",
}
export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        searchText: (state, action) => {
            state.search = action.payload
        },
    },
})

export const { searchText } = filtersSlice.actions
export default filtersSlice.reducer