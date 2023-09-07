import { Bars2Icon, BarsArrowDownIcon, BarsArrowUpIcon, PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import MenuTable from '../DropdownsTable/MenuTable';
import { useDispatch, useSelector } from 'react-redux';
import {
    sortAscending,
    sortDefault,
    sortDescending,
} from '../../pages/Board/tasksSlice';
import { todosRemainningSelector } from '../../redux/selectors';
import GroupTable from '../GroupTable';
import BodyTable from '../BodyTable';

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
    }
]

interface ColumnState {
    isArrowUp: null | boolean;
    isArrowDown: null | boolean;
    isGroup: null | boolean;
}

const ViewTable: React.FC<HeadTableProps> = () => {

    const tasks = useSelector(todosRemainningSelector)
    const [array] = useState([...tasks]);
    const dispatch = useDispatch();

    const [columnStates, setColumnStates] = useState<Record<string, ColumnState>>({
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
    });
    const [isDataGroup, setIsDataGroup] = useState(false);
    const [colCurren, setColCurren] = useState<string | null>(null);

    useEffect(() => {
        const { title, status, inProgress, size } = columnStates;
        const isAllDefault = !(
            title.isArrowDown || title.isArrowUp ||
            status.isArrowDown || status.isArrowUp || status.isGroup ||
            inProgress.isArrowDown || inProgress.isArrowUp || inProgress.isGroup ||
            size.isArrowDown || size.isArrowUp || size.isGroup
        );

        if (isAllDefault) {
            dispatch(sortDefault({ array }));
        }
    }, [array, columnStates, dispatch]);

    const showArrowUpIcon = (columnId: string) => {
        dispatch(sortAscending(columnId))
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
        dispatch(sortDescending(columnId))
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
        dispatch(sortDescending(columnId));
        setColCurren(columnId);
        resetOtherGroupIcon(columnId);
        setIsDataGroup(!columnStates[columnId].isGroup);
        setColumnStates(prevStates => ({
            ...prevStates,
            [columnId]: {
                isArrowUp: prevStates[columnId].isArrowUp,
                isArrowDown: prevStates[columnId].isArrowDown,
                isGroup: !prevStates[columnId].isGroup,
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
        <>
            <div className='flex border-y min-w-max  '>
                <div className='px-10'></div>
                <div className=' flex items-center text-[#656d76] ' >
                    {headTable.map((headCol, index) => {
                        return (
                            <div key={index} className="border-r border-solid text-[14px] w-[300px] font-semibold px-2 py-1">
                                <div className='flex items-center justify-between'>
                                    <div>{headCol.title}</div>
                                    <div className='flex items-center'>
                                        {columnStates[headCol.id].isGroup &&
                                            <div className='px-1'><Bars2Icon className="w-5 text-gray-500" /></div>
                                        }
                                        {columnStates[headCol.id].isArrowUp &&
                                            <div className='hover:bg-[#eeeff2] cursor-pointer p-1 rounded-md '
                                                onClick={() => showArrowDownIcon(headCol.id)}  >
                                                <BarsArrowUpIcon className="w-5 text-gray-500" />
                                            </div>
                                        }
                                        {
                                            columnStates[headCol.id].isArrowDown &&
                                            <div className='hover:bg-[#eeeff2] cursor-pointer p-1 rounded-md '
                                                onClick={() => showArrowUpIcon(headCol.id)} >
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
                    <div className=" border-solid font-semibold flex justify-start">
                        <div className='p-2 hover:bg-[#eeeff2] '>
                            <PlusIcon className='w-[21px]' />
                        </div>
                    </div>
                </div>
            </div>
            {!isDataGroup ? <BodyTable /> : <GroupTable colCurren={colCurren} />}

        </>


    );
};

export default ViewTable;

