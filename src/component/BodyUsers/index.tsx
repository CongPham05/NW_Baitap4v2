import React, { useState, useEffect } from 'react';
import requestApi from '../../helpers/api';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/reducerSlice/listUserSlice';
import { authSelector } from '../../redux/selectors';
import socket from '../../socket';

interface User {
    id: number;
    userName: string;
    email: string;
}
interface UserUpdate {
    id: number;
    userName: string;
    email: string;
    status: boolean;
}

interface BodyUsersProps { }

const BodyUsers: React.FC<BodyUsersProps> = () => {
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);
    const [listUser, setListUser] = useState<User[]>([])
    const [updateUser, setUpdateUser] = useState<UserUpdate[]>([])
    const [onlineUsers, setOnlineUsers] = useState<{ userId: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await requestApi('users', 'GET', []);
                const fetchData = res.data.users;
                const dataUser = fetchData.filter((data: { roles: string; }) => data.roles !== 'admin')
                dispatch(getUsers({ dataUser }));
                setListUser(dataUser);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        socket.emit("new-user-add", auth.id);
        socket.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [auth])

    useEffect(() => {
        const socketIds = new Set(onlineUsers.map(socket => socket.userId));
        const updatedUsers = listUser.map(user => ({
            ...user,
            status: socketIds.has(user.id) ? true : false,
        }));
        setUpdateUser(updatedUsers)
    }, [listUser, onlineUsers])


    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    updateUser.map((user) => (
                        <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600
                                 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="text-base font-semibold">{user.userName}</div>
                            </th>
                            <td className="px-6 py-4 text-base "> {user.email} </td>

                            <td className="px-6 py-4 ">
                                {
                                    user.status
                                        ? <div className='flex items-center'>
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-1"></div>
                                            <span>Online</span>
                                        </div>
                                        : <div className='flex items-center'>
                                            <div className="h-2.5 w-2.5 rounded-full bg-slate-500 mr-1"></div>
                                            <span>Offline</span>
                                        </div>
                                }
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" type="button" data-modal-target="editUserModal"
                                    data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit user
                                </a>

                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default BodyUsers;