import React from 'react'
import { authSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import Avatar from '../../assets/Avatar';
import { format } from "timeago.js";

interface Message {
    senderId?: number;
    text: string;
    chatId?: number;
    createdAt: Date;
    receiverId?: number;
}
interface MessageProps {
    message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
    const user = useSelector(authSelector);
    let isSendByCurrenUser = false;

    if (user.id === message.senderId) {
        isSendByCurrenUser = true;
    }

    return (
        isSendByCurrenUser
            ? (
                <div className='flex justify-end my-1 '>
                    <div className='flex flex-col  bg-blue-500 px-3 py-1.5 rounded-2xl  '>
                        <span className="text-base items-center text-white max-w-[200px] break-words">
                            {message.text}
                        </span>
                        <div className=' flex justify-end text-[10px] text-white'>
                            <span> {format(message.createdAt)}</span>
                        </div>
                    </div>
                </div>
            )
            : (
                <div className='flex justify-start my-2'>
                    <div className="flex flex-row items-center space-x-1.5">
                        <Avatar />
                        <div className="flex flex-col items-cente bg-gray-200 px-3 py-1.5 rounded-2xl">
                            <span className="text-base items-center  max-w-[200px] break-words">
                                {message.text}
                            </span>
                            <div className=' flex justify-start text-[10px]'>
                                <span> {format(message.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
    );
};

export default Message;



