import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { XMarkIcon, ChartPieIcon } from '@heroicons/react/24/outline'
import { Id, Task } from "../../types"
import WrapOptions from "../../services/WrapOptions";
import { useState } from "react";
import Modal from "../../services/Modal";



interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
}

function TaskCard({ task, deleteTask }: Props) {
    const [isModal, setIsModal] = useState(false);
    const handleShowModal = () => { setIsModal(!isModal) }

    const { setNodeRef, attributes, listeners, transform, transition, isDragging }
        = useSortable({
            id: task.id,
            data: { type: "Task", task },
            disabled: isModal,
        });
    const style = { transition, transform: CSS.Transform.toString(transform) };
    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style}
                className="bg-white opacity-50 rounded-lg border border-[#0969da] min-h-[90px] h-[90px]"
            />
        );
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="pc-css-todo hover:cursor-grab group hover:border-[#0969da] relative ">
            <div className='flex items-center text-[#656d76] text-xs'>
                <span className='inline-block w-5'>
                    <ChartPieIcon />
                </span>
                <span className='mr-2' >Draft</span>
            </div>
            <div className=' text-sm'>
                <span className='hover:underline hover:text-[#0969da] cursor-pointer py-1.5 inline-block'
                    onClick={handleShowModal}
                >
                    <span> {task.content}</span>
                </span>
            </div>

            <Modal isOpen={isModal} onRequestClose={handleShowModal} task={task} />
            <WrapOptions task={task} type={null} />
            <div className="hidden group-hover:block w-9 absolute right-[2px] top-5 -translate-y-1/2 text-[#656d76] p-2 
                            opacity-60 hover:opacity-100  hover:text-red-500 cursor-pointer "
                onClick={() => { deleteTask(task.id) }}
            >
                <XMarkIcon />
            </div>
        </div>
    );
}

export default TaskCard;