import React, { useEffect, useRef, useState } from 'react'
import { colorOptionSelector, colsSelector, prioritySelector, sizeSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import PlusIcon from '../../icons/PlusIcon';
import { ChartPieIcon } from '@heroicons/react/24/outline';
import ModalEdit from '../../services/ModalEdit';
import { Task } from '../../types';
import OptionsTable from '../OptionsTable/OptionsTable';

interface GroupTableProps {
    dataList: Task[];
    colCurren: string | null;
}
const type = {
    status: 'STATUS',
    priority: 'PRIORITY',
    size: 'SIZE'
}
const GroupTable: React.FC<GroupTableProps> = ({ colCurren, dataList }) => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            setShowInput(false);
            setInputValue('');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
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

    const colorCol = useSelector(colorOptionSelector)
    const columns = useSelector(colsSelector)
    const prioritys = useSelector(prioritySelector)
    const sizes = useSelector(sizeSelector)

    const [isModal, setIsModal] = useState(false);
    const [modalTask, setModalTask] = useState<Task | null>(null);

    const handleShowModal = (selectedTask: Task) => {
        setIsModal(true);
        setModalTask(selectedTask);
    }

    if (colCurren === "status") {
        const newColumns = columns.map(column => {
            const columnTasks = dataList.filter(task => task.columnId === column.id);
            const [colorTasks] = colorCol.filter(color => color.id === column.colorId);
            return {
                ...column,
                dataList: columnTasks,
                color: colorTasks,
            };
        });
        return (
            <div className='overflow-x-hidden dark:bg-slate-800 pb-40 '>
                {newColumns.map((column) => (
                    <div key={column.id} className='dark:border-slate-600  border-t'>
                        <div className='dark:border-slate-600 flex items-center gap-3 border-b py-2  pl-6  '>
                            <div className='w-4 h-4 border rounded-full '
                                style={{
                                    borderColor: `${column.color.colorBorder}`,
                                    backgroundColor: `${column.color.colorBg}`,
                                }}> </div>
                            <div className='font-medium dark:text-white '> {column.title}</div>
                            <div className='w-4 h-4 bg-[#e8ebef]  rounded-xl flex items-center justify-center'>
                                <span className='text-[#656d76] text-xs block'>{column.dataList.length}</span>
                            </div>
                        </div>
                        <div >
                            {
                                column.dataList.map((task, index) => (
                                    <div key={task.id} className=' dark:border-slate-600 flex border-b border-solid  text-[#656d76] '>
                                        <div className="dark:text-white flex justify-center items-center w-20 min-w-[80px] ">
                                            <span className="text-sm ">{index + 1}</span>
                                        </div>
                                        <div className='dark:border-slate-600 flex items-center border-r border-solid text-sm w-[300px] min-w-[300px] font-semibold p-2'>
                                            <span className=' w-5 mr-1.5'>
                                                <ChartPieIcon />
                                            </span>
                                            <span className='dark:text-white hover:underline hover:text-[#0969da] cursor-pointer font-normal'
                                                onClick={() => handleShowModal(task)}
                                            >
                                                {task.content}
                                            </span>
                                        </div>
                                        <OptionsTable task={task} typeOption={type.status} />
                                        <OptionsTable task={task} typeOption={type.priority} />
                                        <OptionsTable task={task} typeOption={type.size} />
                                    </div>
                                ))
                            }
                            {isModal && modalTask && (
                                <ModalEdit onRequestClose={() => setIsModal(false)} task={modalTask} />
                            )}
                        </div>
                        <div className="dark:border-slate-600  dark:text-white border-b border-solid font-normal text-xs  flex items-center justify-start">
                            <div className='p-2 hover:bg-[#eeeff2] '>
                                <PlusIcon />
                            </div>
                            <div>Add item</div>
                        </div>
                        <div className='dark:bg-slate-600 py-1.5 bg-[#f6f8fa]'></div>
                    </div>
                ))}
            </div>
        );
    }
    if (colCurren === "inProgress") {
        const newPriority = prioritys.map(priority => {
            const priorityTasks = dataList.filter(task => task.priorityId === priority.id);
            const [colorTasks] = colorCol.filter(color => color.id === priority.colorId);
            return {
                ...priority,
                dataList: priorityTasks,
                color: colorTasks,
            };
        });

        return (
            <div className='overflow-x-hidden '>
                {newPriority.map((column) => (
                    <div key={column.id} className=' border-y shadow-sm'>
                        <div className='flex items-center pl-6 gap-3 border-b '>
                            <div className='w-4 h-4 border rounded-full '
                                style={{
                                    borderColor: `${column.color.colorBorder}`,
                                    backgroundColor: `${column.color.colorBg}`,
                                }}> </div>
                            <div className='py-2 font-medium  '> {column.title}</div>
                        </div>
                        <div >
                            {
                                column.dataList.map((task, index) => (
                                    <div key={task.id} className='flex border-b border-solid  text-[#656d76] '>
                                        <div className="flex justify-center items-center w-20 min-w-[80px] ">
                                            <span className="text-sm ">{index + 1}</span>
                                        </div>
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                                            <span className=' w-5 mr-1.5'>
                                                <ChartPieIcon />
                                            </span>
                                            <span className=' hover:underline hover:text-[#0969da] cursor-pointer font-normal'
                                                onClick={() => handleShowModal(task)}
                                            >
                                                {task.content}
                                            </span>
                                        </div>
                                        <OptionsTable task={task} typeOption={type.status} />
                                        <OptionsTable task={task} typeOption={type.priority} />
                                        <OptionsTable task={task} typeOption={type.size} />
                                        <div className=" border-solid font-semibold flex justify-start">
                                            <div className='p-5 hover:bg-[#eeeff2] '>
                                            </div>
                                        </div>
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
        const newSize = sizes.map(size => {
            const sizeTasks = dataList.filter(task => task.sizeId === size.id);
            const [colorTasks] = colorCol.filter(color => color.id === size.colorId);
            return {
                ...size,
                dataList: sizeTasks,
                color: colorTasks,
            };
        });

        return (
            <div className='overflow-x-hidden '>
                {newSize.map((column) => (
                    <div key={column.id} className='border-t  shadow-sm'>
                        <div className='flex items-center pl-6 gap-3 border-b '>
                            <div className='w-4 h-4 border rounded-full '
                                style={{
                                    borderColor: `${column.color.colorBorder}`,
                                    backgroundColor: `${column.color.colorBg}`,
                                }}> </div>
                            <div className='py-2 font-medium  '> {column.title}</div>
                        </div>
                        <div >
                            {
                                column.dataList.map((task, index) => (
                                    <div key={task.id} className='flex border-b border-solid  text-[#656d76] '>
                                        <div className="flex justify-center items-center w-20 min-w-[80px] ">
                                            <span className="text-sm ">{index + 1}</span>
                                        </div>
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                                            <span className=' w-5 mr-1.5'>
                                                <ChartPieIcon />
                                            </span>
                                            <span className=' hover:underline hover:text-[#0969da] cursor-pointer font-normal'
                                                onClick={() => handleShowModal(task)}
                                            >
                                                {task.content}
                                            </span>
                                        </div>
                                        <OptionsTable task={task} typeOption={type.status} />
                                        <OptionsTable task={task} typeOption={type.priority} />
                                        <OptionsTable task={task} typeOption={type.size} />
                                        <div className="  font-semibold flex justify-start">
                                            <div className='p-5 hover:bg-[#eeeff2] '>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            {isModal && modalTask && (
                                <ModalEdit onRequestClose={() => setIsModal(false)} task={modalTask} />
                            )}

                        </div>

                        <div className='flex gap-2 items-center border-b'>
                            <div className='ml-5 w-5'>
                                <PlusIcon />
                            </div>
                            <div className='flex-1 relative py-1.5 cursor-pointer flex items-center' onClick={handleShowInput}>
                                <div className=" rounded-md  text-[#656d76]"> Add item</div>
                                {showInput && (
                                    <input className="w-full px-5 absolute top-0  py-1.5  border-none cursor-auto outline-blue-500 "
                                        ref={inputRef}
                                        autoFocus
                                        type="text"
                                        placeholder='Start typing to create a draft, or type # to select a repository'
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onKeyDown={handleInputEnter}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='py-1.5 bg-[#afb8c133]'></div>
                    </div>
                ))}
            </div>
        );
    }
};

export default GroupTable;


