import React from 'react'
import { dataMess } from '../../types';
import { authSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import Avatar from '../../assets/Avatar';

interface MessageProps {
    message: dataMess;
}

const Message: React.FC<MessageProps> = ({ message }) => {
    const user = useSelector(authSelector);
    let isSendByCurrenUser = false;

    if (user.userName === message.userName) {
        isSendByCurrenUser = true;
    }

    return (
        isSendByCurrenUser
            ? (
                <div className='flex justify-end my-1 '>
                    <div></div>
                    <div className='flex items-center bg-blue-500 px-3 py-1.5 rounded-2xl  '>
                        <p className="text-base text-white max-w-[200px] break-words">{message.message}</p>
                    </div>
                </div>

            )
            : (
                <div className='flex justify-start my-2'>
                    <div className="flex flex-row items-center space-x-1.5">
                        <Avatar />
                        <div className="flex items-cente bg-gray-100 px-3 py-1.5 rounded-2xl">
                            <p className="text-base max-w-[200px] break-words">{message.message}</p>
                        </div>
                    </div>
                </div>
            )
    );
};

export default Message;



