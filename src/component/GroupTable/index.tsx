import React, { useState } from 'react'
import { colsSelector, prioritySelector, sizeSelector, todosRemainningSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import PlusIcon from '../../icons/PlusIcon';
import WrapOptions from '../WrapOptions/WrapOptions';
import { ChartPieIcon } from '@heroicons/react/24/outline';
import ModalEdit from '../../services/ModalEdit';
import { Task } from '../../types';

interface GroupTableProps {
    colCurren: string | null;
}
const GroupTable: React.FC<GroupTableProps> = ({ colCurren }) => {
    console.log(colCurren);

    const tasks = useSelector(todosRemainningSelector)
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
            const columnTasks = tasks.filter(task => task.columnId === column.id);
            return {
                ...column,
                tasks: columnTasks,
            };
        });

        return (
            <div className='overflow-x-hidden '>
                {newColumns.map((column) => (
                    <div key={column.id} className=' border-y shadow-sm'>
                        <div className='border-b py-2 font-medium pl-6 '> {column.title}</div>
                        <div >
                            {
                                column.tasks.map((task, index) => (
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
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                                            <WrapOptions task={task} type={"STATUS"} />
                                        </div>
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px] font-semibold p-2'>
                                            <WrapOptions task={task} type={"PRIORITY"} />
                                        </div>
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                                            <WrapOptions task={task} type={"SIZE"} />
                                        </div>
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

    if (colCurren === "inProgress") {
        const newPriority = prioritys.map(priority => {
            const priorityTasks = tasks.filter(task => task.priorityId === priority.id);
            return {
                ...priority,
                tasks: priorityTasks,
            };
        });

        return (
            <div className='overflow-x-hidden '>
                {newPriority.map((column) => (
                    <div key={column.id} className=' border-y shadow-sm'>
                        <div className='border-b py-2 font-medium pl-6 '> {column.title}</div>
                        <div >
                            {
                                column.tasks.map((task, index) => (
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
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                                            <WrapOptions task={task} type={"STATUS"} />
                                        </div>
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px] font-semibold p-2'>
                                            <WrapOptions task={task} type={"PRIORITY"} />
                                        </div>
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                                            <WrapOptions task={task} type={"SIZE"} />
                                        </div>
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
            const sizeTasks = tasks.filter(task => task.sizeId === size.id);
            return {
                ...size,
                tasks: sizeTasks,
            };
        });

        return (
            <div className='overflow-x-hidden '>
                {newSize.map((column) => (
                    <div key={column.id} className=' border-y shadow-sm'>
                        <div className='border-b py-2 font-medium pl-6 '> {column.title}</div>
                        <div >
                            {
                                column.tasks.map((task, index) => (
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
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                                            <WrapOptions task={task} type={"STATUS"} />
                                        </div>
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px] font-semibold p-2'>
                                            <WrapOptions task={task} type={"PRIORITY"} />
                                        </div>
                                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                                            <WrapOptions task={task} type={"SIZE"} />
                                        </div>
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


};

export default GroupTable;


