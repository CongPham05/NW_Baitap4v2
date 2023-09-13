import React, { useEffect, useRef, useState } from 'react'
import { ChartPieIcon, PlusIcon, } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import ModalEdit from '../../services/ModalEdit';
import { Task } from '../../types';
import OptionsTable from '../OptionsTable/OptionsTable';
import { addTaskTable, updTask } from '../../pages/Board/tasksSlice';

interface BodyTableProps {
    dataList: Task[];
}
const type = {
    status: 'STATUS',
    priority: 'PRIORITY',
    size: 'SIZE'
}
const BodyTable: React.FC<BodyTableProps> = ({ dataList }) => {

    const dispatch = useDispatch();
    const [showInput, setShowInput] = useState(false);
    const [editTitleTask, setEditTitleTask] = useState('');
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

    const [isModalList, setIsModalList] = useState<boolean[]>(Array(dataList.length).fill(false));
    const handleShowModal = (index: number) => {
        const updatedIsModalList = [...isModalList];
        updatedIsModalList[index] = true;
        setIsModalList(updatedIsModalList);

    }
    const changeTitleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitleTask(e.target.value);

    }
    const editNameTask = (index: number) => {
        const updatedIsEditNameTask = [...isEditNameTask];
        updatedIsEditNameTask[index] = true;
        setEditNameTask(updatedIsEditNameTask);
        setEditTitleTask(dataList[index].content);
    }
    const saveTitleTask = (index: number) => {
        const updatedIsEditNameTask = [...isEditNameTask];
        updatedIsEditNameTask[index] = false;
        setEditNameTask(updatedIsEditNameTask);
        (editTitleTask.length) && dispatch(updTask({ id: dataList[index].id, content: editTitleTask }))


    }
    const handleShowInput = () => {
        setShowInput(true);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.length > 0) {
            dispatch(addTaskTable({ inputValue }));
            setInputValue('');
            setShowInput(false);
        }
    };
    return (
        <div className="flex-1 min-w-max dark:bg-slate-700 pb-40">
            {
                dataList.map((task, index) => (
                    <div key={task.id} className='dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-700 flex border-b border-solid hover:bg-[#f6f8fa]'>
                        <div className="flex justify-center items-center w-20 min-w-[80px]  text-[#656d76]">
                            <span className="text-sm  dark-text">{index + 1}</span>
                        </div>

                        <div className='flex items-center dark:border-slate-600  border-r text-sm w-[300px] min-w-[300px]  text-[#656d76]  font-semibold p-2'>
                            <span className=' w-5 mr-1.5'>
                                <ChartPieIcon />
                            </span>
                            <span className=' dark:text-white hover:underline hover:text-[#0969da] cursor-pointer font-normal'
                                onClick={() => handleShowModal(index)}
                            >
                                {task.content}
                            </span>
                        </div>
                        {isModalList[index] && (
                            <ModalEdit onRequestClose={() => setIsModalList(prevState => prevState.map((_, i) => i === index ? false : _))}
                                task={task}
                            />
                        )}
                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.status} /></div>
                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.priority} /></div>
                        <div className='w-[300px] min-w-[300px] '><OptionsTable task={task} typeOption={type.size} /></div>
                    </div>
                ))
            }
            <div className='flex gap-2 items-center border-b bg-white shadow-sm dark-bg  dark:border-b-slate-600  '>
                <div className='ml-5 dark-text'>
                    <PlusIcon className='w-5' />
                </div>
                <div className='flex-1 relative py-2 cursor-pointer flex items-center' onClick={handleShowInput}>
                    <div className=" rounded-md text-[#656d76]"> You can use Enter to add an item</div>
                    {showInput && (
                        <input className="w-full px-5 absolute top-0  h-full  border cursor-auto dark:focus:border-[#218bff]
                        focus:border-[#218bff] outline-none "
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
        </div>
    );
};

export default BodyTable;

