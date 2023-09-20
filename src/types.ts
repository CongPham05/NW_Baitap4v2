export type Id = string | number;
export type IdCol = string | number | undefined;

export type PropTasks = {
    defaultTaskList: Task[],
    taskList: Task[],
}
export type Column = {
    id: Id;
    title: string;
    colorId?: string;
};
export type ColumnState = {
    isArrowUp?: boolean;
    isArrowDown?: boolean;
    isGroup?: boolean;
}
export type Task = {
    id: Id;
    columnId: Id;
    content: string;
    description?: string,
    priorityId: IdCol,
    sizeId: IdCol
};

export type Priority = {
    id: Id,
    colorId: Id
    title?: string,
};

export type Size = {
    id: Id,
    colorId: Id
    title?: string,
};

export type ColorOptions = {
    id: Id,
    name: string,
    colorBorder: string,
    colorBg: string,
    colorText: string,
};

export type ColumnGroup = {
    dataList: Task[];
    color: ColorOptions;
    id: Id;
    colorId?: Id;
    title?: string;
};

export type Credentials = {
    email: undefined;
    password: undefined;
}