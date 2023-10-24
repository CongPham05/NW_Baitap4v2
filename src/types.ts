export type Id = string | number;
export type IdCol = string | number | undefined;

export type PropUser = {
    id: number,
    userName?: string,
    email?: string,
    roles?: string
}
export type PropUserBoard = {
    id: number,
    userName: string,
    email: string,
    roles: string,
    status: boolean,
}

export type PropTasks = {
    defaultTaskList: Task[],
    taskList: Task[],
}
export type Column = {
    id: Id;
    content: string;
    colorId?: string;
};
export type ColumnState = {
    isArrowUp?: boolean;
    isArrowDown?: boolean;
    isGroup?: boolean;
}
export type Task = {
    id: Id;
    statusId: Id;
    content: string;
    description?: string,
    priorityId: IdCol,
    sizeId: IdCol
};

export type Priority = {
    id: Id,
    colorId: Id
    content?: string,
};

export type Size = {
    id: Id,
    colorId: Id
    content?: string,
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
    content?: string;
};

export type Credentials = {
    email: undefined;
    password: undefined;
}
export type RegisterFormValues = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export type ChangePasswordForm = {
    oldPassword: string
    password: string;
    confirmPassword: string;
}
export type LoginFormValues = {
    email: string;
    password: string;
}