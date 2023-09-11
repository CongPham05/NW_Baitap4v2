import React from 'react';
import { RectangleStackIcon, CubeIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { NavLink, useLocation } from 'react-router-dom';


const nav__links = [
    {
        path: '/board',
        display: 'Board',
        icon: <RectangleStackIcon className='w-5' />
    },
    {
        path: '/table',
        display: 'Table',
        icon: <CubeIcon className='w-5' />
    },
]
interface NavbProps {
    // Add any props you might need
}

const Navb: React.FC<NavbProps> = () => {
    const location = useLocation();
    return (
        <nav className=' pl-8 flex dark:bg-slate-800 '>
            {nav__links.map((item, index) => {
                return (
                    <NavLink to={item.path} key={index} className={({ isActive }) => isActive ? "pc-nav-active dark:border-slate-600 dark:border-b-slate-700  dark:bg-slate-700 dark:text-white" : " pc-nav dark:bg-slate-800 dark:text-white  "} >
                        <div className='flex justify-between   '>
                            <div className='flex gap-2'>
                                {item.icon}
                                <span className=' dark:text-white inline-block text-sm '>{item.display}</span>
                            </div>
                            <div className={item.path === location.pathname ? ' pc-border p-[5px]' : 'hidden'} >
                                <ChevronDownIcon className='w-3' />
                            </div>
                        </div>
                    </NavLink>
                )
            })}
            {/* <NewView /> */}
        </nav>
    );
};
export default Navb;