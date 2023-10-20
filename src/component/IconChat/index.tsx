import React, { useEffect, useState } from 'react';
import ChatApp from '../../chatApp/Index';
import ChatHeader from '../../chatApp/ChatHeader';
import ConfirmChat from '../../chatApp/ConfirmChat';
import requestApi from '../../helpers/api';
import { authSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import socket from '../../socket';


const IconChat: React.FC = () => {
    const auth = useSelector(authSelector);
    const [confirmChat, setConfirmChat] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [chatId, setChatId] = useState(undefined);
    const [onlineUser, setOnlineUser] = useState(null);

    const handleShowConfirm = () => {
        setConfirmChat(!confirmChat);
    }
    const handleCloseChat = () => setConfirmChat(false);
    const handleShowAppChat = () => setShowChat(true);

    useEffect(() => {
        const getChat = async () => {
            try {
                const res = await requestApi('chat', 'POST', { senderId: auth.id, receiverId: 1 })
                setChatId(res.data.id)
            } catch (error) {
                console.log(error);
            }
        };
        getChat();
    }, [auth.id]);
    useEffect(() => {
        socket.emit("new-user-add", auth.id);
        socket.on("get-users", (users) => {
            const statusOnline = users.some((user: { userId: number; }) => user.userId === 1)
            setOnlineUser(statusOnline)
        });
    }, [auth])

    return (
        <div className='relative'>
            <div className='fixed z-50 right-6 bottom-6' onClick={handleShowConfirm}>
                <div className='relative flex items-center justify-end'>
                    <div className='text-gray-800 text-left text-sm font-sans font-helvetica font-arial leading-1.28 select-none cursor-pointer w-16 h-16 bg-blue-500 flex justify-center items-center rounded-full'>
                        <svg width="36" height="36" viewBox="0 0 36 36">
                            <path fill="white" d="M1 17.99C1 8.51488 8.42339 1.5 18 1.5C27.5766 1.5 35 8.51488 35 17.99C35 27.4651 27.5766 34.48 18 34.48C16.2799 34.48 14.6296 34.2528 13.079 33.8264C12.7776 33.7435 12.4571 33.767 12.171 33.8933L8.79679 35.3828C7.91415 35.7724 6.91779 35.1446 6.88821 34.1803L6.79564 31.156C6.78425 30.7836 6.61663 30.4352 6.33893 30.1868C3.03116 27.2287 1 22.9461 1 17.99ZM12.7854 14.8897L7.79161 22.8124C7.31238 23.5727 8.24695 24.4295 8.96291 23.8862L14.327 19.8152C14.6899 19.5398 15.1913 19.5384 15.5557 19.8116L19.5276 22.7905C20.7193 23.6845 22.4204 23.3706 23.2148 22.1103L28.2085 14.1875C28.6877 13.4272 27.7531 12.5704 27.0371 13.1137L21.673 17.1847C21.3102 17.4601 20.8088 17.4616 20.4444 17.1882L16.4726 14.2094C15.2807 13.3155 13.5797 13.6293 12.7854 14.8897Z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            {confirmChat && (
                <div className='absolute bottom-24 right-8 w-[378px] bg-white rounded-2xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
                    <ChatHeader handleCloseChat={handleCloseChat} onlineUser={onlineUser} />
                    {!showChat ? <ConfirmChat handleShowAppChat={handleShowAppChat} /> : <ChatApp chatId={chatId} />}
                </div>
            )}
        </div>
    );
};

export default IconChat;
