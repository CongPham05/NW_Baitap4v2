import { useState } from 'react';
import { Task } from '../types'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { updTask, updDesc } from '../pages/Board/tasksSlice'


interface ModalProps {
    isOpen: boolean,
    onRequestClose: () => void,
    task: Task,
}
const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, task }) => {

    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(task.content);
    const [showEditDesc, setShowEditDesc] = useState(false);
    const [descContent, setDescContent] = useState(task.description);

    const handleShowInput = () => {
        setEditMode(!editMode)
        setInputValue(inputValue);
    }
    const handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const handleSaveTitle = () => {
        const id = task.id;
        const content = inputValue;
        dispatch(updTask({ id, content }))
        setEditMode(false)
    }
    const handleSaveDesc = () => {
        const id = task.id;
        const description = descContent;
        console.log({ id, description });

        dispatch(updDesc({ id, description }))
        setShowEditDesc(false)

    }
    const handelChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescContent(e.target.value)
    }
    const handleModalContentClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    };
    if (!isOpen) {
        return null;
    }
    return (
        <div className={`modal ${isOpen ? "open" : ""} cursor-auto`} onClick={onRequestClose}
            draggable={false} >
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
                                <span className='text-xs px-2.5 py-2 font-medium  border-[#d0d7de] rounded-md hover:bg-[#afb8c11d]'>
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
                                    <button className=' px-2 h-7 text-xs border opacity-95 hover:opacity-100 font-medium border-solid border-[#d0d7de] rounded-md text-white bg-[#1f883d] '
                                        onClick={handleSaveTitle}
                                    >
                                        <span className=' '>Save</span>
                                    </button>
                                    <button className='px-2 h-7 text-xs border opacity-80 hover:opacity-100 font-medium border-solid border-[#d0d7de] rounded-md bg-[#afb8c133]'
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
                                    value={descContent}
                                    onChange={handelChangeDesc}
                                />


                                <div className='flex items-center justify-end gap-2'>
                                    <button className='px-2 h-7 text-xs border opacity-80 hover:opacity-100 font-medium border-solid border-[#d0d7de] rounded-md bg-[#afb8c133]'
                                        onClick={() => setShowEditDesc(false)}
                                    >
                                        <span className=''>Cancel</span>
                                    </button>
                                    <button className=' px-2 h-7 text-xs border opacity-95 hover:opacity-100 font-medium border-solid border-[#d0d7de] rounded-md text-white bg-[#1f883d]'
                                        onClick={handleSaveDesc}
                                    >
                                        <span className=' '>Update comment</span>
                                    </button>

                                </div>
                            </div>
                        }

                    </div>
                    <div >Options</div>
                </div>
            </div>
        </div >
    )
}
export default Modal;