import React from 'react'
interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <div className='dark-bg pt-5 '>
            <div className=' header px-8  py-3'>
                <h1 className="text-xl font-semibold  dark-text">{title}</h1>
            </div>
        </div>
    );
};

export default Header;
