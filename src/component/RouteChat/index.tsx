import React, { useEffect, useState } from 'react'
import Avatar from '../../assets/Avatar';
import requestApi from '../../helpers/api';
import { useSelector } from 'react-redux';
import { authSelector, userSelector } from '../../redux/selectors';
import BodyChat from '../BodyChats';
import socket from '../../socket';
import { PropUser } from '../../types';

interface UserUpdate {
    id: number;
    userName?: string;
    email?: string;
    status?: boolean;
}
interface SendMessageProps {
    chatId: number | null;
    receiverId?: number;
    senderId: number;
    text: string;
    createdAt: Date;
}

const RouteChat: React.FC = () => {
    const auth = useSelector(authSelector);
    const listUser = useSelector(userSelector);

    const [active, setActive] = useState<PropUser | null>(null);
    const [chatId, setChatId] = useState<number | null>(null);
    const [updateUser, setUpdateUser] = useState<UserUpdate[]>([])
    const [onlineUsers, setOnlineUsers] = useState<{ userId?: number }[]>([]);
    const [sendMessage, setSendMessage] = useState<SendMessageProps>();
    const [receivedMessage, setReceivedMessage] = useState<SendMessageProps>();

    useEffect(() => {
        const socketIds = new Set(onlineUsers.map(socket => socket.userId));
        const updatedUsers = listUser.map(user => ({
            ...user,
            status: socketIds.has(user?.id) ? true : false,
        }));
        setUpdateUser(updatedUsers)
    }, [listUser, onlineUsers])

    useEffect(() => {
        socket.emit("new-user-add", auth.id);
        socket.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [auth]);

    useEffect(() => {
        if (sendMessage !== null) {
            socket.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    useEffect(() => {
        socket.on("recieve-message", (data) => {
            setReceivedMessage(data);
        });
    }, []);

    const handleOnClick = async (user: PropUser) => {
        setActive(user);
        try {
            const res = await requestApi('chat', 'POST', { senderId: auth.id, receiverId: user.id })
            setChatId(res.data.id)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='col-span-1 border-r cursor-pointer'>
                {
                    updateUser.map(user =>
                        <div
                            key={user.id}
                            className={`pl-3 py-3 hover:bg-slate-200 transition-all border-b flex items-center gap-2 ${(active?.id === user.id) ? 'bg-slate-200' : ''}`}
                            onClick={() => handleOnClick(user)}
                        >
                            <Avatar />
                            <div>
                                {/* {receivedMessage?.senderId === user.id && <p>{receivedMessage.text}</p>} */}
                                <p className="text-base font-semibold">{user.userName}</p>
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
                            </div>
                        </div>
                    )}
            </div>
            <BodyChat
                chatId={chatId}
                currentChat={active}
                currentUser={auth}
                setSendMessage={setSendMessage}
                receivedMessage={receivedMessage}
            />
        </>
    );
};

export default RouteChat;



