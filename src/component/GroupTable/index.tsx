import React, { useState } from 'react'
import { colorOptionSelector, colsSelector, prioritySelector, sizeSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import PlusIcon from '../../icons/PlusIcon';
import { ChartPieIcon, PencilIcon } from '@heroicons/react/24/outline';
import ModalEdit from '../../services/ModalEdit';
import { ColumnState, Task } from '../../types';
import OptionsTable from '../OptionsTable/OptionsTable';

interface GroupTableProps {
    dataList: Task[];
    colCurren: string | null;
    columnStates: Record<string, ColumnState>;
}
const type = {
    status: 'STATUS',
    priority: 'PRIORITY',
    size: 'SIZE'
}
const GroupTable: React.FC<GroupTableProps> = ({ colCurren, dataList, columnStates }) => {
    console.log({ colCurren, dataList });

    const colorCol = useSelector(colorOptionSelector)
    const columns = useSelector(colsSelector)
    const prioritys = useSelector(prioritySelector)
    const sizes = useSelector(sizeSelector)
    const dataSortAndGroup = useSelector(dataSelector)
    console.log("groupType::", dataSortAndGroup.groupType)

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [showEditTitle, setShowEditTitle] = useState<boolean>(false);


    const [isModal, setIsModal] = useState(false);
    const [modalTask, setModalTask] = useState<Task | null>(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            setShowInput(false);
            setInputValue('');
        }
    };

    const handleShowInput = () => {
        setShowInput(true);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.length > 0) {
            // dispatch(addTaskTable({ inputValue }));
            setInputValue('');
            setShowInput(false);
        }
    };
    const handleShowModal = (selectedTask: Task) => {
        setIsModal(true);
        setModalTask(selectedTask);
    }

    if (colCurren === "status") {
        const newCol = columns.map(column => {
            const columnTasks = dataList.filter(task => task.columnId === column.id);
            const [colorTasks] = colorCol.filter(color => color.id === column.colorId);
            return {
                ...column,
                dataList: columnTasks,
                color: colorTasks,
            };
        });
        // if (columnStates[colCurren].isGroup || (columnStates[colCurren].isGroup && columnStates[colCurren].isArrowDown)) {
        //     return newColumns.sort((a, b) => a.title.localeCompare(b.title))

        // }
        // if (columnStates[colCurren].isGroup && columnStates[colCurren].isArrowUp) {
        //     return newColumns.sort((a, b) => b.title.localeCompare(a.title))
        // }
        return (
            <div className='overflow-x-hidden dark:bg-slate-800  '>
                {newColumns.map((column) => (
                    <div key={column.id} className='dark:border-slate-600  border-t'>
                        <div className='dark:border-slate-600 flex items-center gap-3 border-b py-2  pl-6  '>
                            <div className='w-4 h-4 border rounded-full '
                                style={{
                                    borderColor: `${column.color.colorBorder}`,
                                    backgroundColor: `${column.color.colorBg}`,
                                }}> </div>
                            <div className='font-medium dark-text '> {column.title}</div>
                            <div className='w-4 h-4 bg-[#e8ebef]  rounded-xl flex items-center justify-center'>
                                <span className='text-[#656d76] text-xs block'>{column.dataList.length}</span>
                            </div>
                        </div>
                        <div >
                            {
                                column.dataList.map((task, index) => (
                                    <div key={task.id} className=' dark:border-slate-600 dark:hover:bg-slate-700 hover:bg-[#f6f8fa] flex border-b border-solid 
                                     text-[#656d76]  '>
                                        <div className="dark:text-white flex justify-center items-center w-20 min-w-[80px] ">
                                            <span className="text-sm ">{index + 1}</span>
                                        </div>
                                        {!showEditTitle &&
                                            <div className='dark:border-slate-600 flex items-center border-r border-solid text-sm w-[300px] min-w-[300px] 
                                            font-semibold group'
                                                onClick={() => setShowEditTitle(!showEditTitle)}
                                            >
                                                <span className=' w-5 mr-1.5'>
                                                    <ChartPieIcon />
                                                </span>
                                                <div className='flex-1 flex items-center w-full h-full group:hover:border-[#0969da] '>
                                                    <span className=' dark:text-white hover:underline hover:text-[#0969da] cursor-pointer pl-2 font-normal '
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleShowModal(task);
                                                        }}
                                                    >
                                                        {task.content}
                                                    </span>
                                                    <div className='flex flex-1 items-center justify-end  pr-5'>
                                                        <PencilIcon className='w-3 opacity-30 dark:text-white group-hover:opacity-100' />
                                                    </div>

                                                </div>
                                            </div>
                                        }
                                        {showEditTitle && (
                                            <div className='flex items-center gap-2 dark:border-slate-600  border-r text-sm  w-[300px] min-w-[300px]  
                                            text-[#656d76]  font-semibold pl-2' >
                                                <span className=' w-5 mr-1.5'>
                                                    <ChartPieIcon />
                                                </span>
                                                <div className='flex-1 w-full h-full'>
                                                    <input className=" dark:text-black text-sm  font-normal w-full pl-2 h-full outline-[#0969da]"
                                                        value={task.content}
                                                        // onChange={changeTitleTask}
                                                        autoFocus
                                                        onBlur={() => {
                                                            // saveTitleTask(index)
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key !== "Enter") return;
                                                            // saveTitleTask(index)
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                        )}


                                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.status} /></div>
                                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.priority} /></div>
                                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.size} /></div>
                                    </div>
                                ))
                            }
                            {isModal && modalTask && (
                                <ModalEdit onRequestClose={() => setIsModal(false)} task={modalTask} />
                            )}
                        </div>

                    </div>
                ))}
            </div>
        );
    }
    if (colCurren === "inProgress") {
        const newCol = prioritys.map(priority => {
            const priorityTasks = dataList.filter(task => task.priorityId === priority.id);
            const [colorTasks] = colorCol.filter(color => color.id === priority.colorId);
            return {
                ...priority,
                dataList: priorityTasks,
                color: colorTasks,
            };
        });

        return (
            <div className='overflow-x-hidden dark-bg  pb-40 flex flex-col gap-3.5 bg-[#f6f8fa]'>
                {newCol.map((column) => (
                    <div key={column.id} className='dark-border  dark-bg_sub border-t bg-white shadow-sm '>
                        <div className='dark-border flex items-center gap-3 border-b py-2  pl-6  '>
                            <div className='w-4 h-4 border rounded-full '
                                style={{
                                    borderColor: `${column.color.colorBorder}`,
                                    backgroundColor: `${column.color.colorBg}`,
                                }}> </div>
                            <div className='font-medium dark-text '> {column.title}</div>
                            <div className='w-4 h-4 bg-[#e8ebef]  rounded-xl flex items-center justify-center'>
                                <span className='text-[#656d76] text-xs block'>{column.dataList.length}</span>
                            </div>
                        </div>
                        <div >
                            {
                                column.dataList.map((task, index) => (
                                    <div key={task.id} className=' dark-border flex border-b border-solid dark-hover hover:bg-[#f6f8fa]  text-[#656d76] '>
                                        <div className="dark-text flex justify-center items-center w-20 min-w-[80px] ">
                                            <span className="text-sm ">{index + 1}</span>
                                        </div>
                                        <div className='dark-border flex items-center border-r border-solid text-sm w-[300px] min-w-[300px] font-semibold p-2'>
                                            <span className=' w-5 mr-1.5'>
                                                <ChartPieIcon />
                                            </span>
                                            <span className='dark-text hover:underline hover:text-[#0969da] cursor-pointer font-normal'
                                                onClick={() => handleShowModal(task)}
                                            >
                                                {task.content}
                                            </span>
                                        </div>
                                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.status} /></div>
                                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.priority} /></div>
                                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.size} /></div>
                                    </div>
                                ))
                            }
                            {isModal && modalTask && (
                                <ModalEdit onRequestClose={() => setIsModal(false)} task={modalTask} />
                            )}
                        </div>
                        <div className="border-b border-solid font-normal text-xs  flex items-center justify-start">
                            <div className='p-2 hover:bg-[#eeeff2] '>
                                <PlusIcon />
                            </div>
                            <div>Add item</div>
                        </div>
                        <div className='py-1.5 bg-[#afb8c133]'></div>
                    </div>
                ))}
            </div>
        );
    }

    if (colCurren === "size") {
        const newCol = sizes.map(size => {
            const sizeTasks = dataList.filter(task => task.sizeId === size.id);
            const [colorTasks] = colorCol.filter(color => color.id === size.colorId);
            return {
                ...size,
                dataList: sizeTasks,
                color: colorTasks,
            };
        });

        return (
            <div className='overflow-x-hidden dark-bg  pb-40 flex flex-col gap-3.5 bg-[#f6f8fa]'>
                {newCol.map((column) => (
                    <div key={column.id} className='dark-border  dark-bg_sub border-t bg-white shadow-sm '>
                        <div className='dark-border flex items-center gap-3 border-b py-2  pl-6  '>
                            <div className='w-4 h-4 border rounded-full '
                                style={{
                                    borderColor: `${column.color.colorBorder}`,
                                    backgroundColor: `${column.color.colorBg}`,
                                }}> </div>
                            <div className='font-medium dark-text '> {column.title}</div>
                            <div className='w-4 h-4 bg-[#e8ebef]  rounded-xl flex items-center justify-center'>
                                <span className='text-[#656d76] text-xs block'>{column.dataList.length}</span>
                            </div>
                        </div>
                        <div >
                            {
                                column.dataList.map((task, index) => (
                                    <div key={task.id} className=' dark-border flex border-b border-solid hover:bg-[#f6f8fa] dark-hover text-[#656d76] '>
                                        <div className="dark-text flex justify-center items-center w-20 min-w-[80px] ">
                                            <span className="text-sm ">{index + 1}</span>
                                        </div>
                                        <div className='dark-border flex items-center border-r border-solid text-sm w-[300px] min-w-[300px] font-semibold p-2'>
                                            <span className=' w-5 mr-1.5'>
                                                <ChartPieIcon />
                                            </span>
                                            <span className='dark-text hover:underline hover:text-[#0969da] cursor-pointer font-normal'
                                                onClick={() => handleShowModal(task)}
                                            >
                                                {task.content}
                                            </span>
                                        </div>
                                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.status} /></div>
                                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.priority} /></div>
                                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.size} /></div>
                                    </div>
                                ))
                            }
                            {isModal && modalTask && (
                                <ModalEdit onRequestClose={() => setIsModal(false)} task={modalTask} />
                            )}
                        </div>

                    </div>
                ))}
            </div>
        );
    }
};

export default GroupTable;


