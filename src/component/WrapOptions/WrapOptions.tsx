import React from 'react'
import { Column, Priority, Size, Task } from '../../types';
import { useSelector } from 'react-redux';
import { colorOptionSelector, prioritySelector, sizeSelector, colsSelector } from '../../redux/selectors';

interface WrapOptionsProps {
    task: Task,
    type: string
}

const WrapOptions: React.FC<WrapOptionsProps> = ({ task, type }) => {

    const columns = useSelector(colsSelector)
    const optionsPriority = useSelector(prioritySelector)
    const optionsSize = useSelector(sizeSelector)
    const optionsColor = useSelector(colorOptionSelector)

    let targetOption: Column | Priority | Size | null = null;

    if (type === 'STATUS' && typeof task === 'object' && 'columnId' in task) {
        targetOption = columns.find(col => col.id === task.columnId) || null;
    } else if (type === 'PRIORITY' && typeof task === 'object' && 'priorityId' in task) {
        targetOption = optionsPriority.find(option => option.id === task.priorityId) || null;
    } else if (type === 'SIZE' && typeof task === 'object' && 'sizeId' in task) {
        targetOption = optionsSize.find(option => option.id === task.sizeId) || null;
    }


    if (targetOption) {
        const colorOption = optionsColor.find(op => op.id === targetOption?.colorId);
        const finalOption = { ...targetOption, ...colorOption };

        return (
            <div className='flex gap-1'>
                <div className={`px-2 py-[1px] text-xs font-medium border rounded-xl
                                hover:cursor-pointer hover:shadow-md transition-all `}
                    style={{
                        borderColor: `${finalOption.colorBorder}`,
                        backgroundColor: `${finalOption.colorBg}`,
                        color: `${finalOption.colorText}`,
                    }}
                >
                    {finalOption.title}
                </div>
            </div>
        );
    }

    return null;
};

export default WrapOptions;

