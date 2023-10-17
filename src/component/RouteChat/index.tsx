import React, { useEffect, useState } from 'react'
import Avatar from '../../assets/Avatar';
import { useNavigate } from 'react-router-dom';
import requestApi from '../../helpers/api';

interface RouteChatProps {
}
interface User {
    id: number;
    userName: string;
    email: string;
}
const RouteChat: React.FC<RouteChatProps> = () => {

    const [listUser, setListUser] = useState<User[]>([])
    const [active, setActive] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await requestApi('users', 'GET', []);
                const fetchData = res.data.users;
                const dataUser = fetchData.filter((data: { roles: string; }) => data.roles !== 'admin')
                setListUser(dataUser);

            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])
    const navigate = useNavigate();

    const handleOnClick = (userId: number) => {
        navigate(`/admin/chats/${userId}`);
        setActive(userId);
    }
    return (
        <div className='col-span-1 border-r cursor-pointer'>
            {
                listUser.map(user =>
                    <div
                        key={user.id}
                        className={`pl-3 py-3 hover:bg-slate-200 transition-all flex items-center gap-2 ${(active === user.id) ? 'bg-slate-200' : ''}`}
                        onClick={() => handleOnClick(user.id)}
                    >
                        <Avatar />
                        <div>
                            <p className="text-base font-semibold">{user.userName}</p>
                            <p className="font-normal text-gray-500">{user.email}</p>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default RouteChat;



