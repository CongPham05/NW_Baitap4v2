import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from 'react-redux';
import { SortableContext } from "@dnd-kit/sortable";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { Column, Task } from "../../types"
import ColumnContainer from "../../component/ColumnContainer";
import { PlusIcon } from '@heroicons/react/24/outline';
import TaskCard from "../../component/TaskCard";
import { colsSelector, todosRemainningSelector } from "../../redux/selectors";
import { moveTaskToColumn, reorderTasks } from "./tasksSlice";
import { addColumn, moveColumn } from "./colsSlice";


function Board() {
    const dispatch = useDispatch();
    const columns = useSelector(colsSelector)
    const tasks = useSelector(todosRemainningSelector)
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );
    return (
        <div className='dark-bg_sub pt-1 pb-8 pr-7 pl-8 flex flex-grow overflow-y-hidden gap-2 bg-white '>
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className="flex gap-2">
                    <SortableContext items={columnsId}>
                        {columns.map((col) => (
                            <ColumnContainer
                                key={col.id}
                                column={col}
                                tasks={tasks.filter((task) => task.columnId === col.id)}
                            />
                        ))}

                        <div onClick={() => { createNewColumn() }}
                            className='dark-bg  dark-border  dark-text dark-hover hover:bg-[#fff] flex-shrink-0  cursor-pointer w-11 h-11  bg-[#f6f8fa] 
                                    border border-solid border-[#d0d7de] rounded-md flex items-center justify-center'
                        >
                            <PlusIcon className="w-4" />
                        </div>
                    </SortableContext>
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer
                                column={activeColumn}
                                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                            />
                        )}
                        {activeTask && (
                            <TaskCard task={activeTask} handleDisabledDnDKit={function (): void {
                                throw new Error("Function not implemented.");
                            }} />
                        )}
                    </DragOverlay>, document.body
                )}
            </DndContext>
        </div>
    );

    function createNewColumn() {
        dispatch(addColumn())
    }
    function onDragStart(event: DragStartEvent) {

        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;

        dispatch(moveColumn({ activeId, overId }))
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        // Dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            dispatch(reorderTasks({ activeId, overId }))
        }
        const isOverAColumn = over.data.current?.type === "Column";

        //Dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            dispatch(moveTaskToColumn({ activeId, overId }))
        }
    }
}

export default Board;