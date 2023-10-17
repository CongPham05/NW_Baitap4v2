import React, { useEffect, useState } from 'react'
import Avatar from '../../assets/Avatar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import socket from '../../socket';
import { dataMess } from '../../types';
import Message from '../../chatApp/Message';

interface BodyChatProps {
}

const BodyChat: React.FC<BodyChatProps> = () => {
    console.log("1");

    const { userId } = useParams();
    const listUser = useSelector(userSelector);
    const currenUser = listUser.find(user => user.id == userId)

    const [message, setMessage] = useState<string>('');
    const [dataMess, setDataMessage] = useState<dataMess[]>([]);
    const userName = 'Admin';
    const dataMessage = { message, userName }


    const handleSendMessage = () => {
        socket.emit('messageToRoom', { roomId: `admin${userId}`, dataMessage });
        setMessage('');
    };

    useEffect(() => {
        socket.connect();
        socket.emit('joinRoom', { roomId: `admin${userId}` });
        socket.on('messageToClient', ({ dataMessage }) => {
            setDataMessage((prevMessages) => [...prevMessages, dataMessage]);
        });
        return () => {
            socket.disconnect()
        }
    }, []);

    return (
        <div className='col-span-3 flex flex-col bg-slate-50 '>
            <div className="pl-3 py-3 transition-all flex items-center gap-2 border-b bg-white">
                <Avatar />
                <div>
                    <p className="text-base font-semibold">{currenUser?.userName}</p>
                    <p className="font-normal text-gray-500">{currenUser?.email}</p>
                </div>
            </div>
            <div className=' flex flex-col h-[480px] overflow-auto'>
                <div className=''>
                    <div className=" px-6 py-1 ">
                        {dataMess.map((item, index) => <div key={index}><Message message={item} /></div>)}
                    </div>
                </div>
            </div>
            <div className='border-r h-20 flex items-center bg-white group border-t border-blue-500'>
                <input
                    type="text"
                    autoFocus
                    className="w-full block pl-5 text-base text-gray-9 outline-none  bg-white "
                    id="message-box"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button
                    className="px-6 py-2 text-xs font-medium text-center text-white bg-blue-500 mr-10 "
                    type="button"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>

    );
};

export default BodyChat;



