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
import { Column, Id, Task } from "../../types"
import ColumnContainer from "../../component/ColumnContainer";
import PlusIcon from "../../icons/PlusIcon";
import TaskCard from "../../component/TaskCard";
import { tasksSelector, colsSelector } from "../../redux/selectors";
import { addTask, moveTaskToColumn, reorderTasks, delTask, deleteAllTasksInColumn } from "./tasksSlice";
import { addColumn, moveColumn, deleteCol, updateCol } from "./colsSlice";


function Board() {
    const dispatch = useDispatch();
    const tasks = useSelector(tasksSelector)
    const columns = useSelector(colsSelector)
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    return (
        <div className='pt-1 pb-8 pl-8 flex flex-grow overflow-y-hidden gap-2 '>
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
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                deleteAllTask={deleteAllTask}
                                tasks={tasks.filter((task) => task.columnId === col.id)}
                            />
                        ))}

                        <div onClick={() => { createNewColumn() }}
                            className='hover:bg-[#fff] flex-shrink-0  cursor-pointer w-11 h-11  bg-[#f6f8fa] 
                                    border border-solid border-[#d0d7de] rounded-md flex items-center justify-center'
                        >
                            <PlusIcon />
                        </div>
                    </SortableContext>
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer
                                column={activeColumn}
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                deleteTask={deleteTask}
                                deleteAllTask={deleteAllTask}
                                updateTask={updateTask}
                                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                            />
                        )}
                        {activeTask && (
                            <TaskCard
                                task={activeTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />
                        )}
                    </DragOverlay>, document.body
                )}
            </DndContext>

        </div>
    );

    function createTask(columnId: Id, inputValue: string) {
        dispatch(addTask({ columnId, inputValue }))
    }

    function deleteTask(id: Id) {
        dispatch(delTask({ id }))
    }

    function deleteAllTask(id: Id) {
        dispatch(deleteAllTasksInColumn({ id }))
    }


    function updateTask(id: Id, content: string) {
        const newTasks = tasks.map((task) => {
            if (task.id !== id) return task;
            return { ...task, content };
        });

        console.log(newTasks);

    }

    function createNewColumn() {
        dispatch(addColumn())
    }

    function deleteColumn(id: Id) {
        dispatch(deleteCol({ id }))
        dispatch(deleteAllTasksInColumn({ id }))
    }

    function updateColumn(id: Id, title: string) {
        dispatch(updateCol({ id, title }))
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
        console.log({ active, over });

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask) return;

        // Im dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            dispatch(reorderTasks({ activeId, overId }))
        }

        const isOverAColumn = over.data.current?.task.columnId === "Column";
        console.log({ isActiveATask, isOverAColumn });

        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            dispatch(moveTaskToColumn({ activeId, overId }))
            // setTasks((tasks) => {
            //     const activeIndex = tasks.findIndex((t) => t.id === activeId);

            //     tasks[activeIndex].columnId = overId;
            //     console.log("DROPPING TASK OVER COLUMN", { activeIndex });
            //     return arrayMove(tasks, activeIndex, activeIndex);
            // });
        }
    }
}


export default Board;