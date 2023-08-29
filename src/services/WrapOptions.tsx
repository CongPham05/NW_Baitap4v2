import React from 'react'
import { Id } from '../types';


const optionsPriority = [
    {
        id: "urgent",
        title: "🌋 Urgent",
        colorBorder: "#ff818266",
        colorBg: "#ffebe9",
        colorText: "#d1242f",
    },
    {
        id: "high",
        title: "🏔 High",
        colorBorder: "#d4a72c66",
        colorBg: "#fff8c5",
        colorText: "#9a6700",
    },

    {
        id: "medium",
        title: "🏕 Medium",
        colorBorder: "#4ac26b66",
        colorBg: "#dafbe1",
        colorText: "#1a7f37",
    },

    {
        id: "low",
        title: "🏝 Low",
        colorBorder: "#54aeff66",
        colorBg: "#ddf4ff",
        colorText: "#0969da",
    }
]
const optionsSize = [
    {
        id: "xLarge",
        title: "🐋 X-Large",
        colorBorder: "#ff818266",
        colorBg: "#ffebe9",
        colorText: "#d1242f",
    },
    {
        id: "large",
        title: "🦑 Large",
        colorBorder: "#F44336",
        colorBg: "#fff1e5",
        colorText: "#bc4c00",
    },
    {
        id: "mediumS",
        title: "🐂 Medium",
        colorBorder: "#d4a72c66",
        colorBg: "#fff8c5",
        colorText: "#9a6700",
    },
    {
        id: "small",
        title: "🐇 Small",
        colorBorder: "#4ac26b66",
        colorBg: "#dafbe1",
        colorText: "#1a7f37",
    },
    {
        id: "tiny",
        title: "🦔 Tiny",
        colorBorder: "#54aeff66",
        colorBg: "#ddf4ff",
        colorText: "#0969da",
    },
]

interface TaskObject {
    id: Id;
    columnId: Id;
    content: string | null;
    description: string | null;
    priority: Id | null;
    size: Id | null;
}
interface WrapOptionsProps {
    task: string | number | TaskObject,
    type: string | null
}
const WrapOptions: React.FC<WrapOptionsProps> = ({ task, type }) => {
    if (type?.length) {
        if (type === 'PRIORITY') {
            if (typeof task === 'object' && 'priority' in task) {
                const optionPriority = optionsPriority.filter(option => option.id === task.priority)
                const optionTask = [...optionPriority];

                return (
                    <div className='flex gap-1'>
                        {optionTask.map(op => (
                            <div key={op.id} className={`px-2 py-[1px] text-xs font-medium border rounded-xl mt-1
                                                            hover:cursor-pointer hover:shadow-md transition-all `}
                                style={{
                                    borderColor: `${op.colorBorder}`,
                                    backgroundColor: `${op.colorBg}`,
                                    color: `${op.colorText}`,
                                }}
                            >
                                {op.title}
                            </div>
                        ))}
                    </div>
                );
            }
        }
        if (type === 'SIZE') {
            if (typeof task === 'object' && 'size' in task) {
                const optionSize = optionsSize.filter(option => option.id === task.size)
                const optionTask = [...optionSize];
                return (
                    <div className='flex gap-1'>
                        {optionTask.map(op => (
                            <div key={op.id} className={`px-2 py-[1px] text-xs font-medium border rounded-xl mt-1 
                                                            hover:cursor-pointer hover:shadow-md transition-all `}
                                style={{
                                    borderColor: `${op.colorBorder}`,
                                    backgroundColor: `${op.colorBg}`,
                                    color: `${op.colorText}`,
                                }}
                            >
                                {op.title}
                            </div>
                        ))}
                    </div>
                );
            }
        }
    }
    else if (typeof task === 'number') {
        return null;
    }
    else if (typeof task === 'object') {
        const optionPriority = optionsPriority.filter(option => option.id === task.priority)
        const optionSize = optionsSize.filter(option => option.id === task.size)
        const optionTask = [...optionPriority, ...optionSize];

        return (
            <div className='flex gap-1'>
                {optionTask.map(op => (
                    <div key={op.id} className={`px-2 py-[1px] text-xs font-medium border rounded-xl mt-1 hover:cursor-pointer hover:shadow-md transition-all `}
                        style={{
                            borderColor: `${op.colorBorder}`,
                            backgroundColor: `${op.colorBg}`,
                            color: `${op.colorText}`,
                        }}
                    >
                        {op.title}
                    </div>
                ))}
            </div>
        );
    }

};

export default WrapOptions;

