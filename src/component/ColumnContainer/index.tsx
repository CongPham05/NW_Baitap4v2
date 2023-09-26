import { useMemo, useState, useRef } from "react";
import { useOnClickOutside } from 'usehooks-ts';
import { toast } from 'react-toastify';
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, Task } from '../../types';
import { PlusIcon } from '@heroicons/react/24/outline';
import TaskCard from "../TaskCard";
import Dropdowns from "../Dropdowns/Dropdowns";
import ModalDelete from "../../services/ModalDelete";
import { useSelector } from "react-redux";
import { colorOptionSelector } from "../../redux/selectors";
import { updateCol } from "../../redux/reducerSlice/colsSlice";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/reducerSlice/tasksSlice";
import requestApi from "../../helpers/api";


interface Props {
    column: Column;
    tasks: Task[];
}


function ColumnContainer({ column, tasks }: Props) {

    const dispatch = useDispatch()
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

    function handleDisabledDnDKit() {
        setDisabledDnDKit(!disabledDnDKit);
    }
    function deleteColumn() {
        setIsModalDelete(true);
    }
    function deleteAllTask() {
        setIsModalDeleteAll(true);
    }
    const handleClickOutside = () => {
        setShowInput(false);
    }
    useOnClickOutside(inputRef, handleClickOutside)

    const handleInputEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.length > 0) {
            try {
                const fetchData = await requestApi('todo', 'POST', { statusId: column.id, content: inputValue })
                const message = fetchData.data.message;
                toast.success(message, { position: 'bottom-right' })
                dispatch(addTask(fetchData.data.result))
            } catch (error) {
                console.log(error);

            }
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
            className=" dark-border dark-bg bg-[#f6f8fa] flex-col flex w-[350px]
             h-full  pc-border hover:cursor-grab relative "
        >
            {/* Column content */}
            <div className=" py-2 px-4 flex items-center justify-between " >
                <div className="flex gap-2 items-center">
                    <div className='w-4 h-4 border rounded-full'
                        style={{
                            borderColor: `${colorCurren?.colorBorder}`,
                            backgroundColor: `${colorCurren?.colorBg}`,
                        }}> </div>
                    <div onClick={() => { setEditMode(true) }}
                        className=" dark-text gap-2 text-[17px] font-semibold flex items-center cursor-pointer hover:border-b hover:border-[#639ee1] ">
                        {!editMode && column.content}
                        {editMode && (
                            <input className=" dark-text-black text-lg font-semibold  border rounded outline-none px-2 w-[130px]"
                                value={column.content}
                                onChange={(e) => dispatch(updateCol({ id: column.id, content: e.target.value }))}
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
                content="Delete all items?"
                sub='Are you sure you want to delete items from the project?'
            />
            <ModalDelete
                isOpen={isModalDelete}
                onClose={() => setIsModalDelete(false)}
                inputId={column}
                type="COLUMN"
                content="Delete option?"
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
            <button className="dark-hover dark:hover:text-white flex gap-2 items-center 
            rounded-md p-2.5 hover:bg-[#eeeff2] text-[#656d76] "
                onClick={() => setShowInput(true)}
            >
                <PlusIcon className="w-4" />
                Add item
            </button>
            {showInput && (
                <input ref={inputRef} autoFocus type="text"
                    className="dark-border absolute 
                    bottom-0 w-full py-2.5 focus:outline-[#218bff] outline-none rounded-md cursor-auto  px-4"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputEnter}
                />
            )}
        </div>
    );
}

export default ColumnContainer;