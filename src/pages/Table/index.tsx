import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    PlusIcon,
    ChartPieIcon,
    BarsArrowUpIcon,
    BarsArrowDownIcon,
    Bars2Icon
} from '@heroicons/react/24/outline'

import { todosRemainningSelector } from "../../redux/selectors";
import WrapOptions from '../../component/WrapOptions/WrapOptions';
import MenuTable from '../../component/DropdownsTable/MenuTable';
import ModalEdit from '../../services/ModalEdit';
import { Task } from "../../types"
import {
    sortContentAscending,
    sortDefault,
    sortContentDescending,
    sortStatusAscending,
    sortStatusDescending,
    sortInprogressAscending,
    sortInprogressDescending,
    sortSizeAscending,
    sortSizeDescending
} from '../Board/tasksSlice';

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
interface TableProps {
}

const Table: React.FC<TableProps> = () => {
    const dispatch = useDispatch();

    const tasks = useSelector(todosRemainningSelector)
    const [isModal, setIsModal] = useState(false);
    const [modalTask, setModalTask] = useState<Task | null>(null);

    const handleShowModal = (selectedTask: Task) => {
        setIsModal(true);
        setModalTask(selectedTask);
    }
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
        const { title, status, inProgress, size } = columnStates;

        if (title.isArrowUp) {
            dispatch(sortContentAscending());
        } else if (title.isArrowDown) {
            dispatch(sortContentDescending());
        } else if (status.isArrowUp) {
            dispatch(sortStatusAscending());
        } else if (status.isArrowDown) {
            dispatch(sortStatusDescending());
        } else if (inProgress.isArrowUp) {
            dispatch(sortInprogressAscending());
        } else if (inProgress.isArrowDown) {
            dispatch(sortInprogressDescending());
        } else if (size.isArrowUp) {
            dispatch(sortSizeAscending());
        } else if (size.isArrowDown) {
            dispatch(sortSizeDescending());
        } else {
            dispatch(sortDefault());
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
        <div className="w-full mx-auto ">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse font-semibold text-[#656d76] ">
                        <thead >
                            <tr>
                                {headTable.map((headCol, index) => {
                                    return (
                                        <th key={index} className="pl-10 pr-2 border border-solid text-[14px] font-semibold w-[390px]">
                                            <div className='flex items-center justify-between'>
                                                <div>{headCol.title}</div>
                                                <div className='flex items-center'>
                                                    {columnStates[headCol.id].isGroup &&
                                                        <div className='hover:bg-[#eeeff2] cursor-pointer p-1 rounded-md'>
                                                            <Bars2Icon className="w-5 text-gray-500" />
                                                        </div>
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
                                        </th>
                                    )
                                })}
                                <th className="bg-blueGray-50 text-blueGray-500 align-middle border border-solid 
                                                border-blueGray-100  text-[14px]  border-l-0 border-r whitespace-nowrap font-semibold text-left">
                                    <div className='py-2 px-4 w-[52px]  hover:bg-[#eeeff2] '>
                                        <PlusIcon />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={task.id} className='font-normal border-b border-[#d0d7de] text-[#656d76] hover:bg-[#f6f8fa] '>
                                    <th className=" flex justify-start px-2 py-2.5 font-normal border-t-0 
                                                     align-middle border-l-0 border-r text-sm whitespace-nowrap  ">
                                        <div className=' w-1/12  mx-4 '>
                                            {index + 1}
                                        </div>
                                        <div className='flex items-center text-[#656d76] '>
                                            <span className='inline-block w-5 mr-1'>
                                                <ChartPieIcon />
                                            </span>
                                            <span className='inline-block hover:underline hover:text-[#0969da] cursor-pointer'
                                                onClick={() => handleShowModal(task)}
                                            >
                                                {task.content}
                                            </span>

                                        </div>
                                    </th>
                                    <td className=" border-t-0 px-6 align-middle border-l-0 border-r text-sm whitespace-nowrap p-2 ">
                                        <WrapOptions task={task} type={"STATUS"} />
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r text-sm whitespace-nowrap p-2">
                                        <WrapOptions task={task} type={"PRIORITY"} />
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r text-sm whitespace-nowrap p-2">
                                        <WrapOptions task={task} type={"SIZE"} />
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r text-sm whitespace-nowrap p-3">
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            {isModal && modalTask && (
                <ModalEdit onRequestClose={() => setIsModal(false)} task={modalTask} />
            )}
        </div>


    );
};

export default Table;

