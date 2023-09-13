import { Bars2Icon, BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import MenuTable from '../DropdownsTable/MenuTable';
import { useSelector } from 'react-redux';
import { colIdSelector, tasksSelector, todosRemainningSelector } from '../../redux/selectors';
import BodyTable from '../BodyTable';
import GroupTable from '../GroupTable';
import { sortTable } from '../../pages/Board/tasksSlice';
import { selectGroupType, setSortStatus } from '../../pages/Board/dataSlice';

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
    const dispatch = useDispatch();
    const tasks = useSelector(todosRemainningSelector);
    // const dataSortAndGroup = useSelector(dataSelector);

    const [dataList, setdDataList] = useState(tasks);

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
        if (!columnStates[columnIdSort]?.isArrowDown &&
            !columnStates[columnIdSort]?.isArrowUp &&
            !columnStates[columnIdSort]?.isGroup) {
            setdDataList(taskRoot.defaultTaskList)
        }
        else {
            setdDataList(tasks);
        }
    }, [columnIdSort, tasks, columnStates, dispatch, taskRoot.defaultTaskList])
    const sortTasks = (columnId: string, ascending: boolean) => {
        if (!columnIdSort) {
            setdDataList(tasks)
        }
        dispatch(setSortStatus({ columnId, ascending }));
        dispatch(sortTable({ columnId, ascending }));
    };
    const showArrowUpIcon = (columnId: string) => {
        sortTasks(columnId, true);
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
        sortTasks(columnId, false);
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

        console.log(columnId);

        dispatch(selectGroupType(columnId))
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
        < >
            <div className='flex border-y min-w-max dark:bg-slate-800 dark:border-slate-600 '>
                <div className='px-10'></div>
                <div className=' flex items-center text-[#656d76]  dark:text-white' >
                    {headTable.map((headCol, index) => {
                        return (
                            <div key={index} className="dark-border  border-r border-solid text-[14px] w-[300px] font-semibold px-2 py-1">
                                <div className='flex items-center justify-between'>
                                    <div>{headCol.title}</div>
                                    <div className='flex items-center'>
                                        {columnStates[headCol.id].isGroup &&
                                            <div className='px-1 '><Bars2Icon className=" dark-text w-5 text-gray-500" /></div>
                                        }
                                        {columnStates[headCol.id].isArrowUp &&
                                            <div className='dark:hover:bg-slate-600 hover:bg-[#eeeff2] cursor-pointer p-1 rounded-md '
                                                onClick={() => showArrowDownIcon(headCol.id)}  >
                                                <BarsArrowUpIcon className=" dark-text w-5 text-gray-500" />
                                            </div>
                                        }
                                        {
                                            columnStates[headCol.id].isArrowDown &&
                                            <div className='dark:hover:bg-slate-600 hover:bg-[#eeeff2] cursor-pointer p-1 rounded-md '
                                                onClick={() => showArrowUpIcon(headCol.id)} >
                                                <BarsArrowDownIcon className=" dark-text w-5 text-gray-500" />
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
                    {/* <div className="  flex justify-start">
                        <div className='p-2 dark:hover:bg-slate-600 hover:bg-[#eeeff2] '>
                            <PlusIcon className='w-[21px]' />
                        </div>
                    </div> */}
                </div>
            </div>
            {!isDataGroup ? <BodyTable dataList={dataList} /> : <GroupTable dataList={dataList} colCurren={colCurren} columnStates={columnStates} />}
        </>
    );
};

export default ViewTable;

