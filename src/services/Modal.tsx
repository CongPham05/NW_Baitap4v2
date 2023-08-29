import { useState } from 'react';
import { Task } from '../types'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux';
import { updTask } from '../pages/Board/tasksSlice'


interface ModalProps {
    isOpen: boolean,
    onRequestClose: () => void,
    task: Task,
    // updateTask: (id: Id, content: string) => void
}
const Modal: React.FC<ModalProps> = ({ isOpen, onRequestClose, task }) => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setinputValue] = useState(task.content);

    const handleShowInput = () => {
        setEditMode(!editMode)
    }
    const handleValuInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputValue(e.target.value)
    }
    const handleSaveTitle = () => {
        const id = task.id;
        const content = inputValue;
        dispatch(updTask({ id, content }))
        setEditMode(false)
    }
    const handleModalContentClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    };
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    if (!isOpen) {
        return null;
    }
    return (
        <div className={`modal ${isOpen ? "open" : ""} cursor-auto`} onClick={onRequestClose} onDragStart={handleDragStart}
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
                        {!editMode && <div className='flex justify-between'>
                            <span className='text-2xl font-medium'> {task.content} </span>
                            <button onClick={handleShowInput}>
                                <span className='text-xs px-2.5 py-1.5 font-medium  border-[#d0d7de] rounded-md hover:bg-[#afb8c11d]'>
                                    Edit title
                                </span>
                            </button>
                        </div>}
                        {editMode && (
                            <div className='flex items-center justify-between gap-2 mt-2'>
                                <input className="text-[15px] py-[2px] text-[#5b5c5d] border rounded-lg px-4 w-full outline-blue-500"
                                    value={inputValue}
                                    // onChange={(e) => updateColumn(column.id, e.target.value)}
                                    onChange={handleValuInput}
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
                </header>

                <div className="modal-body">
                    <div>xin chào</div>
                </div>
            </div>
        </div>
    )
}
export default Modal;