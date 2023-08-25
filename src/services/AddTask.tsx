import React from 'react'

interface AddTaskProps {

}

const AddTask: React.FC<AddTaskProps> = () => {
    return (
        <div className='hover:bg-[#fff] flex-shrink-0  cursor-pointer w-11 h-11  bg-[#f6f8fa] border border-solid border-[#d0d7de] rounded-md flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
        </div>
    );
};

export default AddTask;