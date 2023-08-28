
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState, useRef, useEffect } from "react";
import { Column, Id, Task } from '../../types';
import PlusIcon from "../../icons/PlusIcon";
import TaskCard from "../TaskCard";
import Dropdowns from "../Dropdowns/Dropdowns";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    createTask: (columnId: Id, inputValue: string) => void;
    updateTask: (id: Id, content: string) => void;
    deleteTask: (id: Id) => void;
    deleteAllTask: (id: Id) => void;
    tasks: Task[];
}

function ColumnContainer({ column, deleteColumn, updateColumn, createTask, tasks, deleteTask, deleteAllTask, updateTask }: Props) {

    const [editMode, setEditMode] = useState(false);
    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setShowInput(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleShowInput = () => {
        setShowInput(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.length > 0) {
            createTask(column.id, inputValue);
            setInputValue('');
            setShowInput(false);
        }
    };

    const { setNodeRef, attributes, listeners, transform, transition, isDragging }
        = useSortable({
            id: column.id,
            data: { type: "Column", column },
            disabled: editMode,
        });

    const style = { transition, transform: CSS.Transform.toString(transform) };

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style}
                className="pc-border w-[350px]" >
            </div>
        );
    }
    return (
        <div ref={setNodeRef} style={style}
            {...attributes}
            {...listeners}
            className="flex-col flex w-[350px] h-full bg-[#f6f8fa] pc-border hover:cursor-grab relative "
        >

            {/* Column title */}
            <div className=" py-2 px-4 flex items-center justify-between " >
                <div onClick={() => { setEditMode(true) }}
                    className=" gap-2 text-[17px] font-semibold flex items-center cursor-pointer hover:border-b hover:border-[#0969da] ">
                    {!editMode && column.title}
                    {editMode && (
                        <input className="text-lg font-semibold  border rounded outline-none px-2 w-[130px]"
                            value={column.title}
                            onChange={(e) => updateColumn(column.id, e.target.value)}
                            autoFocus
                            onBlur={() => {
                                setEditMode(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                setEditMode(false);
                            }}
                        />
                    )}
                    <div className='w-5 h-5 bg-[#e8ebef]  rounded-xl flex items-center justify-center'>
                        <span className='text-[#656d76] text-sm block'>{tasks.length}</span>
                    </div>
                </div>
                <Dropdowns deleteColumn={deleteColumn} column={column} deleteAllTask={deleteAllTask} />
            </div>

            {/* Column task container */}

            <div className="flex flex-col gap-2 flex-grow px-2 pb-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                        />
                    ))}
                </SortableContext>
            </div>
            {/* Column footer */}
            <button className="flex gap-2 items-center rounded-md p-2.5 hover:bg-[#eeeff2] text-[#656d76] "
                onClick={handleShowInput}
            >
                <PlusIcon />
                Add item
            </button>
            {showInput && (
                <input ref={inputRef} autoFocus type="text" className=" absolute bottom-0 w-full h-12 border-none cursor-auto outline-blue-500 px-4"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputEnter}
                />
            )
            }

        </div>


    );
}

export default ColumnContainer;