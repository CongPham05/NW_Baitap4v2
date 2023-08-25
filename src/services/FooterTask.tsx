import React from 'react'

interface FooterTaskProps {
    // title: string;
}

const FooterTask: React.FC<FooterTaskProps> = () => {
    return (

        <button className=' w-full py-2.5 px-2 flex text-[#656d76] font-semibold hover:bg-[#f3f4f6]  '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            <span className='mx-1 text-[15px]'>
                Add item
            </span>
        </button>

    );
};

export default FooterTask;