import React, { useState } from 'react'
import { colorOptionSelector, colsSelector, prioritySelector, sizeSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
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
        const newCol = columns.map(column => {
            const columnTasks = dataList.filter(task => task.columnId === column.id);
            const [colorTasks] = colorCol.filter(color => color.id === column.colorId);
            return {
                ...column,
                dataList: columnTasks,
                color: colorTasks,
            };
        });
        console.log(newCol);

        return (
            <div className='overflow-x-hidden dark:bg-slate-800 pb-40 flex flex-col gap-3.5 bg-[#f6f8fa]'>
                {newCol.map((column) => (
                    <div key={column.id} className='dark:border-slate-600 dark:bg-slate-700 border-t bg-white shadow-sm '>
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
            <div className='overflow-x-hidden dark:bg-slate-800 pb-40 flex flex-col gap-3.5 bg-[#f6f8fa]'>
                {newCol.map((column) => (
                    <div key={column.id} className='dark:border-slate-600  border-t bg-white shadow-sm '>
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
            <div className='overflow-x-hidden dark:bg-slate-800 pb-40 flex flex-col gap-3.5 bg-[#f6f8fa]'>
                {newCol.map((column) => (
                    <div key={column.id} className='dark:border-slate-600  border-t bg-white shadow-sm '>
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


