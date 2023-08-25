import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from '../../types';
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../../icons/PlusIcon";
import TaskCard from "../TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    createTask: (columnId: Id) => void;
    updateTask: (id: Id, content: string) => void;
    deleteTask: (id: Id) => void;
    tasks: Task[];
}

function ColumnContainer({ column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask }: Props) {

    const [editMode, setEditMode] = useState(false);
    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging }
        = useSortable({
            id: column.id, data: { type: "Column", column, },
            disabled: editMode,
        });

    const style = { transition, transform: CSS.Transform.toString(transform) };

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style}
                className="border-2 w-[390px]" >
            </div>
        );
    }

    return (
        <div ref={setNodeRef} style={style}
            className="flex-col flex w-[390px] bg-[#f6f8fa] pc-border "
        >
            {/* Column title */}
            <div onClick={() => { setEditMode(true) }}
                {...attributes}
                {...listeners}
                className=" py-3.5 px-4 flex items-center justify-between " >
                <div className="flex gap-2 text-lg font-semibold">
                    {!editMode && column.title}
                    {editMode && (
                        <input className="text-lg font-semibold  border rounded outline-none px-2"
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
                        <span className='text-[#656d76] text-sm block'>0</span>
                    </div>
                </div>
                <button onClick={() => { deleteColumn(column.id) }}
                    className=" hover:bg-[#f3f4f6] p-1 rounded-lg font-semibold text-[#656d76] " >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6   ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </button>
            </div>

            {/* Column task container */}
            <div className=" flex-grow p-2 overflow-x-hidden overflow-y-auto">
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
            <button className="flex gap-2 items-center rounded-md p-4 hover:bg-[#eeeff2] hover:text-black "
                onClick={() => { createTask(column.id) }}
            >
                <PlusIcon />
                Add task
            </button>
        </div>
    );
}

export default ColumnContainer;