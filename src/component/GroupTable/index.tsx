import React, { useEffect, useRef, useState } from 'react'
import { colIdGroupActive, colorOptionSelector, colsSelector, prioritySelector, sizeSelector, statusIconSelector, todosRemainningSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { PlusIcon } from '@heroicons/react/24/outline';
import { ChartPieIcon, PencilIcon } from '@heroicons/react/24/outline';
import ModalEdit from '../../services/ModalEdit';
import { ColumnGroup, Id, Task } from '../../types';
import OptionsTable from '../OptionsTable/OptionsTable';
import { addTaskTitleGroup } from '../../redux/reducerSlice/tasksSlice';
import { useDispatch } from 'react-redux';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';

interface GroupTableProps {
}

const type = {
    status: 'STATUS',
    priority: 'PRIORITY',
    size: 'SIZE'
}
const GroupTable: React.FC<GroupTableProps> = () => {
    const dispatch = useDispatch();
    const dataList = useSelector(todosRemainningSelector);

    const columns = useSelector(colsSelector)
    const columnIdGroupActive = useSelector(colIdGroupActive)

    const colorCol = useSelector(colorOptionSelector)
    const prioritys = useSelector(prioritySelector)
    const sizes = useSelector(sizeSelector)
    const columnStates = useSelector(statusIconSelector);

    const [showInputGroupMap, setShowInputGroupMap] = useState<{ [colId: string]: boolean }>({});

    const [isModal, setIsModal] = useState(false);
    const [modalTask, setModalTask] = useState<Task | null>(null);
    const [addTaskGroup, setTaskGroup] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);


    const handleClickOutside = (e: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            setTaskGroup('');
            setShowInputGroupMap({});

        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskGroup(event.target.value);
    };
    const saveAddItemEnter = async (event: React.KeyboardEvent<HTMLInputElement>, colId: string | number) => {
        if (event.key === 'Enter' && addTaskGroup.length > 0) {
            let statusId: Id = 'new';
            let priorityId = null;
            let sizeId = null;

            if (columns.some(item => item.id === colId)) {
                statusId = colId;
            } else if (prioritys.some(item => item.id === colId)) {
                priorityId = colId;
            } else if (sizes.some(item => item.id === colId)) {
                sizeId = colId;
            }

            try {
                const fetchData = await requestApi('todo', 'POST', { statusId, priorityId, sizeId, content: addTaskGroup })
                const message = fetchData.data.message;
                const idTodo = fetchData.data.result.id;
                toast.success(message, { position: 'bottom-right' })
                dispatch(addTaskTitleGroup({ idTodo, statusId, priorityId, sizeId, content: addTaskGroup }));

            } catch (error) {
                console.log(error);

            }
            const updatedMap = { ...showInputGroupMap };
            updatedMap[colId] = false;
            setShowInputGroupMap(updatedMap);
            setTaskGroup('');
        }
    }
    const handleShowInputCol = (colId: Id) => {
        const updatedMap = { ...showInputGroupMap };
        updatedMap[colId] = true;
        setShowInputGroupMap(updatedMap);
    };

    const handleShowModal = (selectedTask: Task) => {
        setIsModal(true);
        setModalTask(selectedTask);
    }
    const renderColumns = (columnsData: ColumnGroup[]) => {

        return (
            <div className='overflow-x-hidden dark-bg_sub bg-[#f6f8fa]  flex flex-col pb-40 gap-3 '>
                {columnsData.map((column) => (
                    <div key={column.id} className='dark-border dark-bg bg-white border-t'>
                        <div className='dark-border flex items-center gap-3 border-b py-2  pl-6  '>
                            <div className='w-4 h-4 border rounded-full '
                                style={{
                                    borderColor: `${column.color.colorBorder}`,
                                    backgroundColor: `${column.color.colorBg}`,
                                }}> </div>
                            <div className='font-medium dark-text '> {column.content}</div>
                            <div className='w-4 h-4 bg-[#e8ebef]  rounded-xl flex items-center justify-center'>
                                <span className='text-[#656d76] text-xs block'>{column.dataList.length}</span>
                            </div>
                        </div>
                        <div >
                            {
                                column.dataList.map((task, index) => (
                                    <div key={task.id} className=' dark-border dark-hover hover:bg-[#f6f8fa] flex border-b border-solid 
                                 text-[#656d76]  '>
                                        <div className="dark:text-white flex justify-center items-center w-20 min-w-[80px] ">
                                            <span className="text-sm ">{index + 1}</span>
                                        </div>

                                        <div className='dark-border flex items-center border-r border-solid text-sm w-[300px] min-w-[300px] 
                                        font-semibold group'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShowModal(task);
                                            }}
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
                        <div className="relative flex items-center justify-start dark-text dark-borderB border-b border-solid dark-hover hover:bg-[#f6f8fa]  " >
                            <div className='pl-4 text-[#656d76] m'>
                                <PlusIcon className='w-4' />
                            </div>
                            <div className='relative flex-1 py-2 text-[#656d76] hover:border-[#218bff] cursor-pointer pl-3'
                                onClick={() => handleShowInputCol(column.id)}
                            >
                                <div className=' text-sm font-medium'>Add item</div>
                                {showInputGroupMap[column.id] && (
                                    <input className="w-full px-5 absolute top-0 right-0  h-full text-black border-2 cursor-auto dark:focus:border-[#218bff] focus:border-[#218bff] outline-none "
                                        ref={inputRef}
                                        autoFocus
                                        type="text"
                                        placeholder='Add item'
                                        value={addTaskGroup}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => saveAddItemEnter(e, column.id)}
                                    />
                                )}
                            </div>

                        </div>

                    </div>
                ))}
            </div>
        )
    }

    if (columnIdGroupActive === "status") {
        if (columnStates[columnIdGroupActive].isArrowDown) {
            const columnsData = columns.map(column => {
                const columnTasks = dataList.filter(task => task.statusId === column.id);
                const [colorTasks] = colorCol.filter(color => color.id === column.colorId);
                return {
                    ...column,
                    dataList: columnTasks,
                    color: colorTasks,
                };
            });
            const reversedArray = columnsData.reverse();
            return renderColumns(reversedArray);
        }
        else {
            const columnsData = columns.map(column => {
                const columnTasks = dataList.filter(task => task.statusId === column.id);
                const [colorTasks] = colorCol.filter(color => color.id === column.colorId);
                return {
                    ...column,
                    dataList: columnTasks,
                    color: colorTasks,
                };
            });
            return renderColumns(columnsData);
        }
    }
    if (columnIdGroupActive === "inProgress") {
        if (columnStates[columnIdGroupActive].isArrowDown) {
            const columnsData = prioritys.map(priority => {
                const priorityTasks = dataList.filter(task => task.priorityId === priority.id);
                const [colorTasks] = colorCol.filter(color => color.id === priority.colorId);
                return {
                    ...priority,
                    dataList: priorityTasks,
                    color: colorTasks,
                };
            });
            const reversedArray = columnsData.reverse();
            return renderColumns(reversedArray);
        }
        else {
            const columnsData = prioritys.map(priority => {
                const priorityTasks = dataList.filter(task => task.priorityId === priority.id);
                const [colorTasks] = colorCol.filter(color => color.id === priority.colorId);
                return {
                    ...priority,
                    dataList: priorityTasks,
                    color: colorTasks,
                };
            });
            return renderColumns(columnsData);
        }
    }
    if (columnIdGroupActive === "size") {
        if (columnStates[columnIdGroupActive].isArrowDown) {
            const columnsData = sizes.map(size => {
                const sizeTasks = dataList.filter(task => task.sizeId === size.id);
                const [colorTasks] = colorCol.filter(color => color.id === size.colorId);
                return {
                    ...size,
                    dataList: sizeTasks,
                    color: colorTasks,
                };
            });
            const reversedArray = columnsData.reverse();
            return renderColumns(reversedArray);
        }
        else {
            const columnsData = sizes.map(size => {
                const sizeTasks = dataList.filter(task => task.sizeId === size.id);
                const [colorTasks] = colorCol.filter(color => color.id === size.colorId);
                return {
                    ...size,
                    dataList: sizeTasks,
                    color: colorTasks,
                };
            });
            return renderColumns(columnsData);
        }
    }
};

export default GroupTable;


