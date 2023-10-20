import React from 'react';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';


const nav__links = [
    // {
    //     path: '/admin/dashboard',
    //     display: 'Dashboard',
    //     icon: <ListBulletIcon className='w-5' />
    // },
    {
        path: '/admin/users',
        display: 'Users',
        icon: <ListBulletIcon className='w-5' />
    },
    {
        path: '/admin/chats',
        display: 'Chats',
        icon: <ListBulletIcon className='w-5' />
    },
]


const NavbarAdmin: React.FC = () => {
    return (
        <nav className='  flex dark-bg flex-col col-span-1 h-full bg-slate-300'>
            {nav__links.map((item, index) => {
                return (
                    <NavLink to={item.path} key={index} className={({ isActive }) => isActive ? "bg-slate-400" : ""} >
                        <div className='flex justify-between py-2   '>
                            <div className='flex gap-2 px-2'>
                                {item.icon}
                                <span className=' dark-text inline-block text-sm '>{item.display}</span>
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </nav>
    );
};
export default NavbarAdmin;