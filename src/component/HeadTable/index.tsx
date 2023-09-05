import { Bars2Icon, BarsArrowDownIcon, BarsArrowUpIcon, PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import MenuTable from '../DropdownsTable/MenuTable';
import { useDispatch } from 'react-redux';
import {
    sortContentAscending,
    sortContentDescending,
    sortDefault,
    sortInprogressAscending,
    sortInprogressDescending,
    sortSizeAscending,
    sortSizeDescending,
    sortStatusAscending,
    sortStatusDescending
} from '../../pages/Board/tasksSlice';

interface HeadTableProps {
}
const headTable = [
    {
        id: 'title',
        title: "Tilte",
        optionUp: "Sort ascending",
        optionDown: "Sort descending"
    },
    {
        id: 'status',
        title: "Status",
        optionUp: "Sort ascending",
        optionDown: "Sort descending",
        optionGroup: "Group by values"
    },
    {
        id: 'inProgress',
        title: "In progress",
        optionUp: "Sort ascending",
        optionDown: "Sort descending",
        optionGroup: "Group by values"
    },
    {
        id: 'size',
        title: "Size",
        optionUp: "Sort ascending",
        optionDown: "Sort descending",
        optionGroup: "Group by values"
    },
]

interface ColumnState {
    isArrowUp: boolean;
    isArrowDown: boolean;
    isGroup: boolean | undefined;
}
const HeadTable: React.FC<HeadTableProps> = () => {

    const dispatch = useDispatch();

    const [columnStates, setColumnStates] = useState<Record<string, ColumnState>>({
        title: {
            isArrowUp: false,
            isArrowDown: false,
            isGroup: undefined
        },
        status: {
            isArrowUp: false,
            isArrowDown: false,
            isGroup: false,
        },
        inProgress: {
            isArrowUp: false,
            isArrowDown: false,
            isGroup: false,
        },
        size: {
            isArrowUp: false,
            isArrowDown: false,
            isGroup: false,
        },
    });


    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-types
        const sortActions: Record<string, Record<string, Function>> = {
            title: {
                up: sortContentAscending,
                down: sortContentDescending,
            },
            status: {
                up: sortStatusAscending,
                down: sortStatusDescending,
            },
            inProgress: {
                up: sortInprogressAscending,
                down: sortInprogressDescending,
            },
            size: {
                up: sortSizeAscending,
                down: sortSizeDescending,
            },
        };
        const dispatchAction = (property: keyof typeof sortActions, direction: string) => {
            const action = sortActions[property][direction];
            if (action) {
                dispatch(action());
            } else {
                dispatch(sortDefault());
            }
        };

        for (const property of Object.keys(columnStates) as (keyof typeof sortActions)[]) {
            if (columnStates[property].isArrowUp) {
                dispatchAction(property, 'up');
                return;
            } else if (columnStates[property].isArrowDown) {
                dispatchAction(property, 'down');
                return;
            }
        }
    }, [columnStates, dispatch]);

    const showArrowUpIcon = (columnId: string) => {
        resetOtherArrowStates(columnId);
        setColumnStates(prevStates => ({
            ...prevStates,
            [columnId]: {
                isArrowUp: !prevStates[columnId].isArrowUp,
                isArrowDown: false,
                isGroup: prevStates[columnId].isGroup,
            },
        }));
    };

    const showArrowDownIcon = (columnId: string) => {
        resetOtherArrowStates(columnId);
        setColumnStates(prevStates => ({
            ...prevStates,
            [columnId]: {
                isArrowUp: false,
                isArrowDown: !prevStates[columnId].isArrowDown,
                isGroup: prevStates[columnId].isGroup,
            },
        }));
    };
    const showGroupIcon = (columnId: string) => {
        resetOtherGroupIcon(columnId);
        setColumnStates(prevStates => ({
            ...prevStates,
            [columnId]: {
                isArrowUp: prevStates[columnId].isArrowUp,
                isArrowDown: prevStates[columnId].isArrowDown,
                isGroup: !prevStates[columnId].isGroup,
            },
        }));
    };
    const reverseIconUpDown = (columnId: string) => {
        setColumnStates(prevStates => ({
            ...prevStates,
            [columnId]: {
                isArrowUp: !prevStates[columnId].isArrowUp,
                isArrowDown: !prevStates[columnId].isArrowDown,
                isGroup: prevStates[columnId].isGroup,
            },
        }));
    };

    const resetOtherArrowStates = (currentColumnId: string) => {
        setColumnStates((prevStates) => {
            const updatedStates = { ...prevStates };
            for (const columnId in updatedStates) {
                if (columnId !== currentColumnId) {
                    updatedStates[columnId].isArrowUp = false;
                    updatedStates[columnId].isArrowDown = false;
                }
            }
            return updatedStates;
        });
    };
    const resetOtherGroupIcon = (currentColumnId: string) => {
        setColumnStates((prevStates) => {
            const updatedStates = { ...prevStates };
            for (const columnId in updatedStates) {
                if (columnId !== currentColumnId) {
                    updatedStates[columnId].isGroup = false;
                }
            }
            return updatedStates;
        });
    };
    return (
        <div className=' flex items-center text-[#656d76] ' >
            {headTable.map((headCol, index) => {
                return (
                    <div key={index} className=" border-y border-r border-solid text-[14px] font-semibold w-[390px] px-2 py-1">
                        <div className='flex items-center justify-between'>
                            <div>{headCol.title}</div>
                            <div className='flex items-center'>
                                {columnStates[headCol.id].isGroup &&
                                    <div className='px-1'><Bars2Icon className="w-5 text-gray-500" /></div>
                                }
                                {columnStates[headCol.id].isArrowUp &&
                                    <div className='hover:bg-[#eeeff2] cursor-pointer p-1 rounded-md '
                                        onClick={() => reverseIconUpDown(headCol.id)}  >
                                        <BarsArrowUpIcon className="w-5 text-gray-500" />
                                    </div>
                                }
                                {
                                    columnStates[headCol.id].isArrowDown &&
                                    <div className='hover:bg-[#eeeff2] cursor-pointer p-1 rounded-md '
                                        onClick={() => reverseIconUpDown(headCol.id)} >
                                        <BarsArrowDownIcon className="w-5 text-gray-500" />
                                    </div>
                                }
                                <MenuTable
                                    showArrowUpIcon={() => showArrowUpIcon(headCol.id)}
                                    showArrowDownIcon={() => showArrowDownIcon(headCol.id)}
                                    showGroupIcon={() => showGroupIcon(headCol.id)}
                                    isArrowUp={columnStates[headCol.id].isArrowUp}
                                    isArrowDown={columnStates[headCol.id].isArrowDown}
                                    isGroup={columnStates[headCol.id].isGroup}
                                    headCol={headCol}
                                />
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="border-y border-r border-solid px-2 py-1 w-[52px] font-semibold flex justify-start">
                <div className=' p-1 hover:bg-[#eeeff2] '>
                    <PlusIcon className='w-[21px]' />
                </div>
            </div>
        </div>
    );
};

export default HeadTable;

