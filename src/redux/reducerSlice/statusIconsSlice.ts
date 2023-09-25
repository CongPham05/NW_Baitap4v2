import { PayloadAction, createSlice } from '@reduxjs/toolkit'
interface StatusIconsState {
    [key: string]: {
        isArrowUp?: boolean;
        isArrowDown?: boolean;
        isGroup?: boolean;
    };
}
const initialState: StatusIconsState = {
    content: {
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
        updateStatusUpIcon: (state, action: PayloadAction<{ statusId: string | keyof StatusIconsState }>) => {
            const { statusId } = action.payload;

            if (statusId in state) {
                return {
                    ...state,
                    [statusId]: {
                        isArrowUp: !state[statusId]?.isArrowUp,
                        isArrowDown: false,
                        isGroup: state[statusId]?.isGroup,
                    },
                };
            } else {
                return state;
            }
        },

        updateStatusDownIcon: (state, action: PayloadAction<{ statusId: string | keyof StatusIconsState }>) => {
            const { statusId } = action.payload;

            if (statusId in state) {
                return {
                    ...state,
                    [statusId]: {
                        isArrowUp: false,
                        isArrowDown: !state[statusId].isArrowDown,
                        isGroup: state[statusId].isGroup,
                    },
                };
            } else {
                return state;
            }
        },

        updateStatusGroupIcon: (state, action: PayloadAction<{ statusId: string | keyof StatusIconsState }>) => {
            const { statusId } = action.payload;

            if (statusId in state) {
                return {
                    ...state,
                    [statusId]: {
                        isArrowUp: state[statusId].isArrowUp,
                        isArrowDown: state[statusId].isArrowDown,
                        isGroup: !state[statusId].isGroup,
                    },
                };
            } else {
                return state;
            }
        },

        resetOtherArrow: (state, action: PayloadAction<{ currentColumnId: string | keyof StatusIconsState }>) => {
            const { currentColumnId } = action.payload;

            if (currentColumnId in state) {

                for (const statusId in state) {
                    if (statusId !== currentColumnId) {
                        state[statusId].isArrowUp = false;
                        state[statusId].isArrowDown = false;
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

                for (const statusId in state) {
                    if (statusId !== currentColumnId) {
                        state[statusId].isGroup = false;
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


