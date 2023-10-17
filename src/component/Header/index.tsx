import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ToggleTheme from '../ToggleTheme';
import ModalEditUser from '../../services/ModalEditUser';
import { authSelector } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../redux/reducerSlice/authSlice';
import socket from '../../socket';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isModalDelete, setIsModalDelete] = useState(false);
    const user = useSelector(authSelector);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token === null) {
            navigate('/login');

        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('inforUser');
        localStorage.removeItem('hasCalledApi');
        dispatch(resetUser());
        socket.disconnect();
        navigate('/login');
    };
    return (
        <div className='dark-bg pt-5 '>
            <div className=' header px-8 py-3 flex justify-between'>
                <h1 className="text-2xl font-bold dark-text ">Github Project</h1>
                <div className='flex items-center '>
                    <span className='font-bold mr-4 dark-text hover:underline cursor-pointer'
                        onClick={() => setIsModalDelete(true)}
                    >{`Hello, ${user?.userName}`}
                    </span>
                    <ToggleTheme />
                    <button
                        className='border rounded-md px-3 py-1 bg-slate-500 text-white hover:bg-red-400'
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            </div>
            <ModalEditUser
                isOpen={isModalDelete}
                onClose={() => setIsModalDelete(false)}
                user={user}
            />
        </div>
    );
};

export default Header;
