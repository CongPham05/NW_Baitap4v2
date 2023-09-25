import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { XMarkIcon, ChartPieIcon } from '@heroicons/react/24/outline'
import { Task } from "../../types"
import WrapOptions from "../WrapOptions/WrapOptions";
import { useState } from "react";
import ModalEdit from "../../services/ModalEdit";
import ModalDelete from "../../services/ModalDelete";



interface Props {
    task: Task;
    handleDisabledDnDKit: () => void;
}

function TaskCard({ task, handleDisabledDnDKit }: Props) {
    const [isModal, setIsModal] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);

    const handleShowModal = () => {
        handleDisabledDnDKit();
        setIsModal(!isModal)
    }

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
                className="dark-bg_sub bg-white opacity-50 rounded-lg border border-[#0969da] min-h-[90px] h-[90px]"
            />
        );
    }
    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="dark-bg_sub dark-border dark-bg   dark:hover:border-[#0969da] pc-css-todo 
                hover:cursor-grab group hover:border-[#0969da] relative ">
                <div className='flex items-center text-[#656d76] text-xs'>
                    <span className='inline-block w-5'>
                        <ChartPieIcon />
                    </span>
                    <span className='mr-2 ' >Draft</span>
                </div>
                <div className=' text-sm'>
                    <span className='hover:underline hover:text-[#0969da] cursor-pointer py-1.5 inline-block'
                        onClick={handleShowModal}
                    >
                        <span className=" dark-text"> {task.content}</span>
                    </span>
                </div>
                {isModal && <ModalEdit onRequestClose={handleShowModal} task={task} />}
                <div className="flex gap-2">
                    <WrapOptions task={task} type={"PRIORITY"} />
                    <WrapOptions task={task} type={"SIZE"} />
                </div>
                <div className="hidden group-hover:block w-9 absolute right-[2px] top-5 -translate-y-1/2 text-[#656d76] p-2 
                            opacity-60 hover:opacity-100  hover:text-red-500 cursor-pointer "
                    onClick={() => setIsModalDelete(true)}
                >
                    <XMarkIcon />
                </div>
                <ModalDelete
                    isOpen={isModalDelete}
                    onClose={() => setIsModalDelete(false)}
                    inputId={task}
                    type="TASK"
                    content="Delete item?"
                    sub='Are you sure you want to delete this item from this project?'
                />

            </div>
        </>
    );
}

export default TaskCard;