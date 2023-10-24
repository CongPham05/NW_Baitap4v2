import { Bars2Icon, BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import MenuTable from '../DropdownsTable/MenuTable';
import { useSelector } from 'react-redux';
import { colIdGroupActive, colIdSelector, statusIconSelector, tasksSelector, todosRemainningSelector } from '../../redux/selectors';
import BodyTable from '../BodyTable';
import GroupTable from '../GroupTable';
import { sortTable } from '../../redux/reducerSlice/tasksSlice';
import { selectGroupType, setColStatus, setSortStatus } from '../../redux/reducerSlice/currenColTableSlice';
import { resetOtherArrow, resetOtherGroup, updateStatusDownIcon, updateStatusGroupIcon, updateStatusUpIcon } from '../../redux/reducerSlice/statusIconsSlice';

interface HeadTableProps {
}
const headTable = [
    {
        id: 'content',
        content: "Tilte",
        optionUp: "Sort ascending",
        optionDown: "Sort descending"
    },
    {
        id: 'status',
        content: "Status",
        optionUp: "Sort ascending",
        optionDown: "Sort descending",
        optionGroup: "Group by values"
    },
    {
        id: 'inProgress',
        content: "In progress",
        optionUp: "Sort ascending",
        optionDown: "Sort descending",
        optionGroup: "Group by values"
    },
    {
        id: 'size',
        content: "Size",
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

    const sortTasks = (statusId: string, ascending: boolean) => {
        if (!columnIdSort) {
            setdDataList(tasks)
        }
        dispatch(setSortStatus({ statusId, ascending }));
        dispatch(sortTable({ statusId, ascending }));
    };
    const showArrowUpIcon = (statusId: string) => {
        sortTasks(statusId, true);

        dispatch(resetOtherArrow({ currentColumnId: statusId }));
        dispatch(updateStatusUpIcon({ statusId }));



    };
    const showArrowDownIcon = (statusId: string) => {
        sortTasks(statusId, false);

        dispatch(resetOtherArrow({ currentColumnId: statusId }));
        dispatch(updateStatusDownIcon({ statusId }));

    };
    const showGroupIcon = (statusId: string) => {
        dispatch(selectGroupType({ statusId }));
        dispatch(updateStatusGroupIcon({ statusId }));
        dispatch(resetOtherGroup({ currentColumnId: statusId }));

    };

    return (
        < >
            <div className='flex border-y min-w-max dark-bg dark-border   '>
                <div className='px-10'></div>
                <div className=' flex items-center text-[#656d76] dark-text ' >
                    {headTable.map((headCol, index) => {
                        return (
                            <div key={index} className="dark-border   border-r border-solid text-[14px] w-[300px] font-semibold px-2 py-1">
                                <div className='flex items-center justify-between'>
                                    <div>{headCol.content}</div>
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
                </div>
            </div>
            {
                (columnStates[columnIdGroupActive]?.isGroup) ? <GroupTable /> : <BodyTable dataList={dataList} />
            }
        </>
    );
};

export default ViewTable;

