import { useState } from "react";
import TrashIcon from "../../icons/TrashIcon";
import { Id, Task } from "../../types"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(true);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging }
        = useSortable({
            id: task.id,
            data: {
                type: "Task",
                task,
            },
            disabled: editMode,
        });

    const style = { transition, transform: CSS.Transform.toString(transform) };

    const toggleEditMode = () => {
        setEditMode((prev) => !prev);
        setMouseIsOver(false);
    };

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style}
                className="opacity-30  p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-blue-600  cursor-grab relative"
            />
        );
    }

    if (editMode) {
        return (
            <div ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className=" bg-white  p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl cursor-grab  hover:ring-2 ">
                <textarea
                    className=" h-[90%] w-full resize-none rounded  focus:outline-none "
                    value={task.content}
                    autoFocus
                    placeholder="Task content here"
                    onBlur={toggleEditMode}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.shiftKey) {
                            toggleEditMode();
                        }
                    }}
                    onChange={(e) => updateTask(task.id, e.target.value)}
                />
            </div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={toggleEditMode}
            className="px-3 flex flex-col gap-2 flex-grow relative "
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}
        >
            <div className="pc-css-todo hover:cursor-grab group mb-2 pb-6  hover:border-[#0969da]">
                <div className='flex items-center text-[#656d76] text-sm'>
                    <span className='inline-block'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                        </svg>
                    </span>
                    <span className='mr-2' >Draft</span>
                    <div className='hidden group-hover:block'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                    </div>
                </div>
                <div className='py-1'>
                    <a href='#' className='hover:underline hover:text-[#0969da]' >
                        <span> {task.content}</span>
                    </a>
                </div>
                {mouseIsOver && (
                    <button
                        onClick={() => {
                            deleteTask(task.id);
                        }}
                        className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-black 
                                    p-2 rounded opacity-60 hover:opacity-100"
                    >
                        <TrashIcon />
                    </button>
                )}
            </div>
        </div >
    );
}

export default TaskCard;