import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToggleTheme from '../ToggleTheme';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const inforUserString = localStorage.getItem('inforUser');
        if (inforUserString !== null) {
            const inforUser = JSON.parse(inforUserString);
            setUserName(inforUser.userName);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('inforUser');
        localStorage.removeItem('hasCalledApi');
        setUserName('');
        navigate('/login');
    };

    return (
        <div className='dark-bg pt-5 '>
            <div className=' header px-8 py-3 flex justify-between'>
                <h1 className="text-xl font-semibold dark-text">{`${userName}'s untitled project`}</h1>
                <div className='flex items-center '>
                    <span className='font-bold mr-4 dark-text'>{`Hello, ${userName}`}</span>
                    <ToggleTheme />
                    <button
                        className='border rounded-md px-3 py-1 bg-slate-500 text-white hover:bg-red-400'
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
