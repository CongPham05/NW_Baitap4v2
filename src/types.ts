export type Id = string | number;
export type IdCol = string | number | null;

export type Column = {
    id: Id;
    title: string;
    colorId: string | null;
};
export type ColumnState = {
    isArrowUp: null | boolean;
    isArrowDown: null | boolean;
    isGroup: null | boolean;
}
export type Task = {
    id: Id;
    columnId: Id;
    content: string;
    description: null | string,
    priorityId: IdCol,
    sizeId: IdCol
};

export type Priority = {
    id: Id,
    colorId: Id
    title: string | null,
};

export type Size = {
    id: Id,
    colorId: Id
    title: string | null,
};

export type ColorOptions = {
    id: Id,
    name: string,
    colorBorder: string,
    colorBg: string,
    colorText: string,
};