import React, { useEffect, useRef, useState } from 'react'
import { ChartPieIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useDispatch, } from 'react-redux';
import ModalEdit from '../../services/ModalEdit';
import { Task } from '../../types';
import OptionsTable from '../OptionsTable/OptionsTable';
import { addTaskTable } from '../../redux/reducerSlice/tasksSlice';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';

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
    const [inputValue, setInputValue] = useState('');
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isModalList, setIsModalList] = useState<boolean[]>(Array(dataList?.length).fill(false));


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
    const handleShowModal = (index: number) => {
        const updatedIsModalList = [...isModalList];
        updatedIsModalList[index] = true;
        setIsModalList(updatedIsModalList);

    }
    const handleShowInput = () => {
        setShowInput(true);
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    const handleInputEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.length > 0) {

            try {
                const fetchData = await requestApi('todo', 'POST', { statusId: "new", content: inputValue })
                const message = fetchData.data.message;
                const idTodo = fetchData.data.result.id;
                toast.success(message, { position: 'bottom-right' })
                dispatch(addTaskTable({ idTodo, inputValue }));
            } catch (error) {
                console.log(error);
            }
            setInputValue('');
            setShowInput(false);
        }
    };


    return (
        <div className="flex-1 overflow-x-hidden min-w-max dark-bg_sub bg-[#f6f8fa]  pb-40">
            {
                dataList?.map((task, index) => (
                    <div key={task.id} className='dark-bg dark-border dark-hover
                     flex border-b bg-white border-solid hover:bg-[#f6f8fa]'>
                        <div className="flex justify-center items-center w-20 min-w-[80px]  text-[#656d76]">
                            <span className="text-sm  dark-text">{index + 1}</span>
                        </div>

                        <div className='flex items-center dark-border  border-r text-sm w-[300px] 
                            min-w-[300px]  text-[#656d76]  font-semibold pl-2 cursor-pointer  group'
                            onClick={(e) => {
                                e.stopPropagation();
                                handleShowModal(index);
                            }}
                        >
                            <span className=' w-5 mr-1.5'>
                                <ChartPieIcon />
                            </span>
                            <div className='flex-1 flex items-center w-full h-full group:hover:border-[#0969da] '>
                                <span className=' dark:text-white hover:underline hover:text-[#0969da] cursor-pointer pl-2 font-normal '
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleShowModal(index);
                                    }}
                                >
                                    {task.content}
                                </span>
                                <div className='flex flex-1 items-center justify-end  pr-5'>
                                    <PencilIcon className='w-3 opacity-30 group-hover:opacity-100' />
                                </div>
                            </div>
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
                        <input className="w-full px-5 absolute top-0  h-full  border-2 cursor-auto dark:focus:border-[#218bff]
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

