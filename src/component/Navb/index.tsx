import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import NewView from '../../services/NewView';

const nav__links = [
    {
        path: '/board',
        display: 'Board',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
        </svg>
    },
    {
        path: '/table',
        display: 'Table',
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
    },
]
interface NavbProps {
    // Add any props you might need
}

const Navb: React.FC<NavbProps> = () => {
    const location = useLocation();
    return (
        <nav className='bg-[#f6f8fa] pl-8 flex'>
            {nav__links.map((item, index) => {
                return (
                    <NavLink to={item.path} key={index} className={({ isActive }) => isActive ? "pc-nav-active" : " pc-nav "} >
                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                {item.icon}
                                <span className=' text-black inline-block text-sm'>{item.display}</span>
                            </div>
                            <div className={item.path === location.pathname ? 'block pc-border p-[5px]' : 'hidden'} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>

                            </div>
                        </div>
                    </NavLink>
                )
            })}
            <NewView />
        </nav>
    );
};

export default Navb;