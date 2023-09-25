import React from "react";
const newView = {
    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>,
    content: 'New View'
}
interface NewViewProps {
}

const NewView: React.FC<NewViewProps> = () => {
    return (
        <div className='flex justify-between items-center gap-2 cursor-pointer  dark-hover dark-text
                        rounded-lg text-sm text-[#656d76] hover:bg-[#eeeff2]  hover:text-black  px-4 '>
            {newView.icon} {newView.content}
        </div>

    );
};

export default NewView;

