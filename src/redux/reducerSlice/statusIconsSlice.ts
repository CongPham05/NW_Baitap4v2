import { PayloadAction, createSlice } from '@reduxjs/toolkit'
interface StatusIconsState {
    [key: string]: {
        isArrowUp?: boolean;
        isArrowDown?: boolean;
        isGroup?: boolean;
    };
}
const initialState: StatusIconsState = {
    title: {
        isArrowUp: undefined,
        isArrowDown: undefined,
        isGroup: undefined
    },
    status: {
        isArrowUp: undefined,
        isArrowDown: undefined,
        isGroup: undefined,
    },
    inProgress: {
        isArrowUp: undefined,
        isArrowDown: undefined,
        isGroup: undefined,
    },
    size: {
        isArrowUp: undefined,
        isArrowDown: undefined,
        isGroup: undefined,
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


