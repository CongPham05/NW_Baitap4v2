import React from 'react'


interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <div className=' pt-5 bg-[#f6f8fa]'>
            <div className='header px-8  py-3'>
                <h1 className="text-xl font-semibold">{title}</h1>
            </div>
        </div>
    );
};

export default Header;
