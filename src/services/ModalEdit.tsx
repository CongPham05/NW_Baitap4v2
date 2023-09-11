import { useState } from 'react';
import { Task } from '../types';
import { ArchiveBoxIcon, EyeSlashIcon, SparklesIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { updTask, updDesc } from '../pages/Board/tasksSlice';
import ModalDelete from './ModalDelete';
import DropdownsEdit from '../component/DropdownsEdit';

interface ModalProps {
    onRequestClose: () => void,
    task: Task,
}

const type = {
    status: 'STATUS',
    priority: 'PRIORITY',
    size: 'SIZE'
}

const ModalEdit: React.FC<ModalProps> = ({ onRequestClose, task }) => {

    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(task.content);
    const [showEditDesc, setShowEditDesc] = useState(false);
    const [descContent, setDescContent] = useState(task.description);
    const [isModalDelete, setIsModalDelete] = useState(false);

    const handleShowModalDel = () => {
        setIsModalDelete(false);
        onRequestClose();
    }
    const handleShowInput = () => {
        setEditMode(!editMode)
        setInputValue(task.content);
    }
    const handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const handleSaveTitle = () => {
        const id = task.id;
        const content = inputValue;
        setInputValue(content);
        dispatch(updTask({ id, content }))
        setEditMode(false)
    }
    const handleSaveDesc = () => {
        const id = task.id;
        const description = descContent;
        dispatch(updDesc({ id, description }))
        setShowEditDesc(false)
    }
    const handleCancelDesc = () => {
        setShowEditDesc(false);
        setDescContent(task.description);
    }
    const handelChangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContent = e.target.value;
        setDescContent(newContent)
    }
    const handleModalContentClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    };
    return (
        <div className='modal open cursor-auto' onClick={onRequestClose}>
            <div className="modal-content" onClick={handleModalContentClick}>
                <header>
                    <div className='px-6 pt-5'>
                        <div className='flex justify-end '>
                            <div className='hover:bg-[#f3f4f6] hover:rounded-md ' onClick={onRequestClose}>
                                <div className="close-button w-4 text-[#656d76]" >
                                    <XMarkIcon />
                                </div>
                            </div>
                        </div>
                        {!editMode && <div className='flex justify-between items-center h-[35px]'>
                            <span className='text-2xl font-medium'> {inputValue} </span>
                            <button onClick={handleShowInput}>
                                <span className='text-xs px-2.5 py-2 font-medium border-[#d0d7de] rounded-md hover:bg-[#afb8c11d]'>
                                    Edit title
                                </span>
                            </button>
                        </div>}
                        {editMode && (
                            <div className='flex items-center justify-between h-[35px] gap-2'>
                                <input className="text-[15px] py-[2px] text-[#5b5c5d] border rounded-lg px-4 w-full outline-blue-500"
                                    value={inputValue}
                                    onChange={handleValueInput}
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key !== "Enter") return;
                                        handleSaveTitle()
                                    }}
                                />
                                <div className='flex items-center gap-2'>
                                    <button className=' px-2 h-7 text-xs border opacity-95 hover:opacity-100 font-medium 
                                                         border-solid border-[#d0d7de] rounded-md text-white bg-[#1f883d] '
                                        onClick={handleSaveTitle}
                                    >
                                        <span className=' '>Save</span>
                                    </button>
                                    <button className='px-2 h-7 text-xs border opacity-80 hover:opacity-100 font-medium 
                                                        border-solid border-[#d0d7de] rounded-md bg-[#afb8c133]'
                                        onClick={handleShowInput}
                                    >
                                        <span className=''>Cancel</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='border-b border-gray-300 pb-9'></div>
                </header>
                <div className="modal-body grid  grid-cols-3 h-full ">
                    <div className='flex flex-col gap-4 border-r border-solid border-[#d0d7de] col-span-2 '>
                        {
                            !showEditDesc &&
                            <div className='p-4 flex flex-col gap-4'>
                                <div className='flex items-center justify-between'>
                                    <div className='text-lg font-semibold'> Description:</div>
                                    <button className='flex items-center justify-center px-2  py-1.5 rounded-md hover:bg-[#f3f4f6]'
                                        onClick={() => setShowEditDesc(true)}
                                    >
                                        <span className='text-xs font-medium'> Edit</span>
                                    </button>
                                </div>
                                {task.description === null ?
                                    <p className='italic text-sm text-[#656d76]'>No description provided</p> :
                                    <p className='text-sm text-[#656d76]'>{descContent}</p>}

                            </div>
                        }
                        {
                            showEditDesc &&
                            <div className='p-4 '>
                                <label htmlFor="" className='text-lg font-medium'>Write your description:</label>
                                <textarea name="description" id="description " rows={5} autoFocus
                                    className='resize-y text-sm border border-solid w-full pl-1 py-1 outline-none rounded-md border-[#0969da]'
                                    value={descContent || ''}
                                    onChange={handelChangeDesc}
                                />

                                <div className='flex items-center justify-end gap-2'>
                                    <button className='px-2 h-7 text-xs border opacity-80 hover:opacity-100 font-medium 
                                                     border-solid border-[#d0d7de] rounded-md bg-[#afb8c133]'
                                        onClick={handleCancelDesc}
                                    >
                                        <span className=''>Cancel</span>
                                    </button>
                                    <button className=' px-2 h-7 text-xs border opacity-95 hover:opacity-100 font-medium 
                                                      border-solid border-[#d0d7de] rounded-md text-white bg-[#1f883d]'
                                        onClick={handleSaveDesc}
                                    >
                                        <span >Update comment</span>
                                    </button>

                                </div>
                            </div>
                        }

                    </div>
                    <div className='grid  grid-rows-3' >
                        <div className='row-span-1 border-b border-solid border-[#d0d7de] grid-cols-3 pt-4 px-4 text-xs font-medium text-[#656d76]'>
                            <div className=''>
                                <div className='flex my-1  items-center'>
                                    <div className='w-1/3 '>Assignees</div>
                                    <div className='w-2/3 p-1.5  hover:bg-[#f6f8fa] rounded-sm cursor-pointer'>
                                        <span className='text-sm font-normal'>Add assignees...</span>
                                    </div>
                                </div>
                                <div className='flex my-1 items-center' >
                                    <div className='w-1/3'>Status</div>
                                    <div className='hover:bg-[#f6f8fa] rounded-sm cursor-pointer w-2/3 '>
                                        <DropdownsEdit task={task} typeOption={type.status} />
                                    </div>
                                </div>
                                <div className='flex my-1 items-center' >
                                    <div className='w-1/3'>Prioriry</div>
                                    <div className='hover:bg-[#f6f8fa] rounded-sm cursor-pointer w-2/3'>
                                        <DropdownsEdit task={task} typeOption={type.priority} />
                                    </div>
                                </div>
                                <div className='flex my-1 items-center' >
                                    <div className='w-1/3'>Size</div>
                                    <div className='hover:bg-[#f6f8fa] rounded-sm cursor-pointer w-2/3'>
                                        <DropdownsEdit task={task} typeOption={type.size} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className='p-2'>
                                <div className='flex items-center '>
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500 ml-1.5" aria-hidden="true" />
                                    <a href="#" className=' pl-2 pb-1.5 flex-grow  text-sm '> Hide from view</a>
                                </div>
                                <div className='flex items-center'>
                                    <SparklesIcon className="h-5 w-5 text-gray-500 ml-1.5" aria-hidden="true" />
                                    <a href="#" className=' pl-2 py-1.5 flex-grow  text-sm '> Set limit</a>
                                </div>
                                <div className='flex items-center '>
                                    <ArchiveBoxIcon className="h-5 w-5 text-gray-500 ml-1.5" aria-hidden="true" />
                                    <a href="#" className=' pl-2 py-1.5 flex-grow text-sm '>Archive</a>
                                </div>
                                <div className='flex items-center text-red-600 hover:bg-[#ffebe9a3] border-solid border-[#d0d7de] rounded-lg'
                                    onClick={() => setIsModalDelete(true)}
                                >
                                    <TrashIcon className="h-5 w-5  text-red-600 ml-1.5" aria-hidden="true" />
                                    <a href="#" className=' pl-2 py-1.5 flex-grow text-sm '>Delete from project </a>
                                </div>
                                <ModalDelete
                                    isOpen={isModalDelete}
                                    onClose={handleShowModalDel}
                                    inputId={task}
                                    type={'TASK'}
                                    title="Delete item?"
                                    sub='Are you sure you want to delete this item from this project?'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default ModalEdit;