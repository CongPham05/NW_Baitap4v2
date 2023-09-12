
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState, useRef, useEffect } from "react";
import { Column, Id, Task } from '../../types';
import PlusIcon from "../../icons/PlusIcon";
import TaskCard from "../TaskCard";
import Dropdowns from "../Dropdowns/Dropdowns";
import ModalDelete from "../../services/ModalDelete";
import { useSelector } from "react-redux";
import { colorOptionSelector } from "../../redux/selectors";

interface Props {
    column: Column;
    updateColumn: (id: Id, title: string) => void;
    createTask: (columnId: Id, inputValue: string) => void;
    tasks: Task[];
}

function ColumnContainer({ column, updateColumn, createTask, tasks }: Props) {


    const colorCol = useSelector(colorOptionSelector)
    const colorCurren = colorCol.find(item => item.id === column.colorId)

    const [isModalDelete, setIsModalDelete] = useState(false);
    const [isModalDeleteAll, setIsModalDeleteAll] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [disabledDnDKit, setDisabledDnDKit] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

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

    const handleDisabledDnDKit = () => {
        setDisabledDnDKit(!disabledDnDKit);
    };

    const handleShowInput = () => {
        setShowInput(true);
    };
    function deleteColumn() {
        setIsModalDelete(true);
    }
    function deleteAllTask() {
        setIsModalDeleteAll(true);
    }

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
            disabled: disabledDnDKit,
        });

    const style = { transition, transform: CSS.Transform.toString(transform) };

    if (isDragging) {
        return (
            <div ref={setNodeRef} style={style}
                className="pc-border w-[350px] " >
            </div>
        );
    }
    return (
        <div ref={setNodeRef} style={style}
            {...attributes}
            {...listeners}
            className=" dark:bg-slate-800 dark:border-slate-600 bg-white flex-col flex w-[350px] h-full  pc-border hover:cursor-grab relative "
        >

            {/* Column title */}
            <div className=" py-2 px-4 flex items-center justify-between " >
                <div className="flex gap-2 items-center">
                    <div className='w-4 h-4 border rounded-full'
                        style={{
                            borderColor: `${colorCurren?.colorBorder}`,
                            backgroundColor: `${colorCurren?.colorBg}`,
                        }}> </div>
                    <div onClick={() => { setEditMode(true) }}
                        className=" dark:text-white gap-2 text-[17px] font-semibold flex items-center cursor-pointer hover:border-b hover:border-[#639ee1] ">
                        {!editMode && column.title}
                        {editMode && (
                            <input className=" dark:text-black text-lg font-semibold  border rounded outline-none px-2 w-[130px]"
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
                        <div className='w-4 h-4 bg-[#e8ebef]  rounded-xl flex items-center justify-center'>
                            <span className='text-[#656d76] text-xs block'>{tasks.length}</span>
                        </div>
                    </div>
                </div>
                <Dropdowns deleteColumn={deleteColumn} column={column} deleteAllTask={deleteAllTask} />
            </div>
            <ModalDelete
                isOpen={isModalDeleteAll}
                onClose={() => setIsModalDeleteAll(false)}
                inputId={column}
                type="ALLTASK"
                title="Delete all items?"
                sub='Are you sure you want to delete items from the project?'
            />
            <ModalDelete
                isOpen={isModalDelete}
                onClose={() => setIsModalDelete(false)}
                inputId={column}
                type="COLUMN"
                title="Delete option?"
                sub='This will permanently delete this option from the "Status" field. This cannot be undone.'
            />


            {/* Column task container */}

            <div className="flex flex-col gap-2 flex-grow px-2 pb-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            handleDisabledDnDKit={handleDisabledDnDKit}
                        />
                    ))}
                </SortableContext>
            </div>
            {/* Column footer */}
            <button className="dark:hover:bg-slate-700 dark:hover:text-white flex gap-2 items-center 
            rounded-md p-2.5 hover:bg-[#eeeff2] text-[#656d76] "
                onClick={handleShowInput}
            >
                <PlusIcon />
                Add item
            </button>
            {showInput && (
                <input ref={inputRef} autoFocus type="text"
                    className="dark:border-slate-600 absolute 
                    bottom-0 w-full py-2.5 focus:outline-[#218bff] outline-none rounded-md cursor-auto  px-4"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputEnter}
                />
            )}
        </div>
    );
}

export default ColumnContainer;