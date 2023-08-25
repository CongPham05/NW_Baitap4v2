import React from 'react'
import clsx from 'clsx';
import Column from '../component/Dropdowns/Column';

interface HeadTaskProps {
    status: string | null,
    lenghTodo: number
}

const HeadTask: React.FC<HeadTaskProps> = ({ status, lenghTodo }) => {

    return (
        < div className='py-3.5 px-4 flex  items-center justify-between ' >
            <div className='flex items-center justify-center'>
                <div className={clsx(status ? 'pc-dot-status' : '')}></div>
                <div className='px-2'><span className='text-base font-semibold block'> {status ? `🆕 ${status}` : "No Status"} </span></div>
                <div className='w-4 h-4 bg-[#e8ebef]  rounded-xl flex items-center justify-center'>
                    <span className='text-[#656d76] text-xs block'>{lenghTodo}</span>
                </div>
            </div>
            <Column />
        </div>
    );
};

export default HeadTask;

