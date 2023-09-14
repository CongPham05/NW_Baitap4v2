import { PayloadAction, createSlice } from '@reduxjs/toolkit'
interface StatusIconsState {
    [key: string]: {
        isArrowUp: null | boolean;
        isArrowDown: null | boolean;
        isGroup: null | boolean;
    };
}
const initialState: StatusIconsState = {
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
        updateStatusUpIcon: (state, action: PayloadAction<{ columnId: string | keyof StatusIconsState }>) => {
            const { columnId } = action.payload;

            if (columnId in state) {
                return {
                    ...state,
                    [columnId]: {
                        isArrowUp: !state[columnId]?.isArrowUp,
                        isArrowDown: false,
                        isGroup: state[columnId]?.isGroup,
                    },
                };
            } else {
                return state;
            }
        },
        updateStatusDownIcon: (state, action: PayloadAction<{ columnId: string | keyof StatusIconsState }>) => {
            const { columnId } = action.payload;

            if (columnId in state) {
                return {
                    ...state,
                    [columnId]: {
                        isArrowUp: false,
                        isArrowDown: !state[columnId].isArrowDown,
                        isGroup: state[columnId].isGroup,
                    },
                };
            } else {
                return state;
            }
        },

        updateStatusGroupIcon: (state, action: PayloadAction<{ columnId: string | keyof StatusIconsState }>) => {
            const { columnId } = action.payload;

            if (columnId in state) {
                return {
                    ...state,
                    [columnId]: {
                        isArrowUp: state[columnId].isArrowUp,
                        isArrowDown: state[columnId].isArrowDown,
                        isGroup: !state[columnId].isGroup,
                    },
                };
            } else {
                return state;
            }
        },

        resetOtherArrow: (state, action: PayloadAction<{ currentColumnId: string | keyof StatusIconsState }>) => {
            const { currentColumnId } = action.payload;

            if (currentColumnId in state) {

                for (const columnId in state) {
                    if (columnId !== currentColumnId) {
                        state[columnId].isArrowUp = false;
                        state[columnId].isArrowDown = false;
                    }
                }
                return state;
            } else {
                return state;
            }
        },
        resetOtherGroup: (state, action: PayloadAction<{ currentColumnId: string | keyof StatusIconsState }>) => {
            const { currentColumnId } = action.payload;

            if (currentColumnId in state) {

                for (const columnId in state) {
                    if (columnId !== currentColumnId) {
                        state[columnId].isGroup = false;
                    }
                }
                return state;
            } else {
                return state;
            }
        },

    }
});

export const { updateStatusUpIcon, updateStatusDownIcon, updateStatusGroupIcon, resetOtherArrow, resetOtherGroup } = statusIconsSlice.actions
export default statusIconsSlice.reducer


