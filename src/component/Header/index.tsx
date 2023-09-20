import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../../redux/apiRequest';
import ToggleTheme from '../ToggleTheme';
import { authSelector } from '../../redux/selectors';
interface HeaderProps {
    enabled: boolean;
    handleToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ enabled, handleToggle }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(authSelector);
    const handleLogout = () => {
        logOutUser(dispatch, navigate);
        navigate('/login');
    }
    return (
        <div className='dark-bg pt-5 '>
            <div className=' header px-8 py-3 flex justify-between'>
                <h1 className="text-xl font-semibold dark-text">{`${auth.logIn.userName}'s untitled project`}</h1>
                <div className='flex items-center '>
                    <span className='font-bold mr-4 dark-text  '>{`Hello,${auth.logIn.userName}`}</span>
                    <ToggleTheme enabled={enabled} handleToggle={handleToggle} />
                    <button className='border rounded-md px-3 py-1 bg-slate-500 text-white hover:bg-red-400'
                        onClick={handleLogout}
                    >Log out</button>
                </div>
            </div>
        </div>
    );
};

export default Header;

