import { Bars2Icon, BarsArrowDownIcon, BarsArrowUpIcon, PlusIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import MenuTable from '../DropdownsTable/MenuTable';
import { useSelector } from 'react-redux';
import { colIdGroupActive, colIdSelector, statusIconSelector, tasksSelector, todosRemainningSelector } from '../../redux/selectors';
import BodyTable from '../BodyTable';
import GroupTable from '../GroupTable';
import { sortTable } from '../../pages/Board/tasksSlice';
import { selectGroupType, setColStatus, setSortStatus } from '../../pages/Table/currenColTableSlice';
import { resetOtherArrow, resetOtherGroup, updateStatusDownIcon, updateStatusGroupIcon, updateStatusUpIcon } from '../../pages/Table/statusIconsSlice';

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

const ViewTable: React.FC<HeadTableProps> = () => {
    const dispatch = useDispatch();
    const columnIdGroupActive = useSelector(colIdGroupActive)

    const tasks = useSelector(todosRemainningSelector);
    const taskRoot = useSelector(tasksSelector);
    const columnIdSort = useSelector(colIdSelector);
    const columnStates = useSelector(statusIconSelector);
    const [dataList, setdDataList] = useState(tasks);

    useEffect(() => {
        if (!columnStates[columnIdSort]?.isArrowDown &&
            !columnStates[columnIdSort]?.isArrowUp &&
            !columnStates[columnIdGroupActive]?.isGroup) {
            dispatch(setColStatus(''));
            dispatch(selectGroupType(''));
            setdDataList(taskRoot.defaultTaskList)
        }
        else {
            setdDataList(tasks);
        }
    }, [columnIdGroupActive, columnIdSort, columnStates, dispatch, taskRoot.defaultTaskList, tasks])

    const sortTasks = (columnId: string, ascending: boolean) => {
        if (!columnIdSort) {
            setdDataList(tasks)
        }
        dispatch(setSortStatus({ columnId, ascending }));
        dispatch(sortTable({ columnId, ascending }));
    };
    const showArrowUpIcon = (columnId: string) => {
        sortTasks(columnId, true);

        dispatch(resetOtherArrow({ currentColumnId: columnId }));
        dispatch(updateStatusUpIcon({ columnId }));

    };
    const showArrowDownIcon = (columnId: string) => {
        sortTasks(columnId, false);

        dispatch(resetOtherArrow({ currentColumnId: columnId }));
        dispatch(updateStatusDownIcon({ columnId }));

    };
    const showGroupIcon = (columnId: string) => {
        dispatch(selectGroupType({ columnId }));
        dispatch(updateStatusGroupIcon({ columnId }));
        dispatch(resetOtherGroup({ currentColumnId: columnId }));

    };
    return (
        < >
            <div className='flex border-y min-w-max dark-bg dark-border   '>
                <div className='px-10'></div>
                <div className=' flex items-center text-[#656d76]   dark:text-white ' >
                    {headTable.map((headCol, index) => {
                        return (
                            <div key={index} className="dark-border   border-r border-solid text-[14px] w-[300px] font-semibold px-2 py-1">
                                <div className='flex items-center justify-between'>
                                    <div>{headCol.title}</div>
                                    <div className='flex items-center'>
                                        {columnStates[headCol.id as keyof typeof columnStates].isGroup &&
                                            <div className='px-1 '><Bars2Icon className=" dark-text w-5 text-gray-500" /></div>
                                        }
                                        {columnStates[headCol.id as keyof typeof columnStates].isArrowUp &&
                                            <div className='dark:hover:bg-slate-600 hover:bg-[#eeeff2] cursor-pointer p-1 rounded-md '
                                                onClick={() => showArrowDownIcon(headCol.id)}  >
                                                <BarsArrowUpIcon className=" dark-text w-5 text-gray-500" />
                                            </div>
                                        }
                                        {
                                            columnStates[headCol.id as keyof typeof columnStates].isArrowDown &&
                                            <div className='dark:hover:bg-slate-600 hover:bg-[#eeeff2] cursor-pointer p-1 rounded-md '
                                                onClick={() => showArrowUpIcon(headCol.id)} >
                                                <BarsArrowDownIcon className=" dark-text w-5 text-gray-500" />
                                            </div>
                                        }
                                        <MenuTable
                                            showArrowUpIcon={() => showArrowUpIcon(headCol.id)}
                                            showArrowDownIcon={() => showArrowDownIcon(headCol.id)}
                                            showGroupIcon={() => showGroupIcon(headCol.id)}
                                            isArrowUp={columnStates[headCol.id as keyof typeof columnStates].isArrowUp}
                                            isArrowDown={columnStates[headCol.id as keyof typeof columnStates].isArrowDown}
                                            isGroup={columnStates[headCol.id as keyof typeof columnStates].isGroup}
                                            headCol={headCol}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="  flex justify-start">
                        <div className='p-2 dark:hover:bg-slate-600 hover:bg-[#eeeff2] '>
                            <PlusIcon className='w-[21px]' />
                        </div>
                    </div>
                </div>
            </div>
            {
                (columnStates[columnIdGroupActive]?.isGroup) ? <GroupTable dataList={dataList} /> : <BodyTable dataList={dataList} />
            }
        </>
    );
};

export default ViewTable;

