import PlusIcon from "../../icons/PlusIcon";
import { useMemo, useState } from "react";
import { Column, Id, Task } from "../../types"
import ColumnContainer from "../../component/ColumnContainer";
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
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "../../component/TaskCard";

const defaultCols: Column[] = [
    {
        id: "new",
        title: "New",
    },
    {
        id: "inProgress",
        title: "In progress",
    },
    {
        id: 'delay',
        title: "Delay"
    },
    {
        id: "done",
        title: "Done",
    },
];

const defaultTasks: Task[] = [
    {
        id: "1",
        columnId: "new",
        content: "Bài 1",
    },
    {
        id: "2",
        columnId: "new",
        content:
            "Bài 2",
    },
    {
        id: "3",
        columnId: "inProgress",
        content: "Bài 3",
    },
    {
        id: "4",
        columnId: "inProgress",
        content: "Bài 4",
    },
    {
        id: "5",
        columnId: "done",
        content: "Bài 5",
    },
    {
        id: "6",
        columnId: "done",
        content: "Bài 6",
    },

    {
        id: "8",
        columnId: "new",
        content: "Bài 8",
    },
    {
        id: "9",
        columnId: "new",
        content: "Bài 9",
    },
    {
        id: "10",
        columnId: "delay",
        content: "Bài 10",
    },
    {
        id: "11",
        columnId: "delay",
        content: "Bài 11",
    },

];

function Board() {

    const [columns, setColumns] = useState<Column[]>(defaultCols);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [tasks, setTasks] = useState<Task[]>(defaultTasks);
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
        <div className='pt-2 pb-20 pl-8 flex flex-grow overflow-y-hidden gap-2'>
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className="flex gap-4">
                    <div className="flex gap-4">
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
                                    tasks={tasks.filter((task) => task.columnId === col.id)}
                                />
                            ))}
                        </SortableContext>
                    </div>
                    <div onClick={() => { createNewColumn() }}
                        className='hover:bg-[#fff] flex-shrink-0  cursor-pointer w-11 h-11  bg-[#f6f8fa] 
                                    border border-solid border-[#d0d7de] rounded-md flex items-center justify-center'
                    >
                        <PlusIcon />
                    </div>
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

    function createTask(columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id: Id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function updateTask(id: Id, content: string) {
        const newTasks = tasks.map((task) => {
            if (task.id !== id) return task;
            return { ...task, content };
        });

        setTasks(newTasks);
    }

    function createNewColumn() {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        };

        setColumns([...columns, columnToAdd]);
    }

    function deleteColumn(id: Id) {
        const filteredColumns = columns.filter((col) => col.id !== id);
        setColumns(filteredColumns);

        const newTasks = tasks.filter((t) => t.columnId !== id);
        setTasks(newTasks);
    }

    function updateColumn(id: Id, title: string) {
        const newColumns = columns.map((col) => {
            if (col.id !== id) return col;
            return { ...col, title };
        });

        setColumns(newColumns);
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

        console.log("DRAG END");

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

            const overColumnIndex = columns.findIndex((col) => col.id === overId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
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

        // Im dropping a Task over another Task
        if (isActiveATask && isOverATask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === "Column";

        // Im dropping a Task over a column
        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);

                tasks[activeIndex].columnId = overId;
                console.log("DROPPING TASK OVER COLUMN", { activeIndex });
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }
}

function generateId() {
    return Math.floor(Math.random() * 10001);
}

export default Board;