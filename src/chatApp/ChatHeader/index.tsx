import { MinusIcon } from "@heroicons/react/24/outline";
import React from "react";
import Avatar from "../../assets/Avatar";


interface ChatHeaderProps {
    handleCloseChat: () => void;
    onlineUser: null | boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ handleCloseChat, onlineUser }) => {

    return (
        <div className='flex justify-between p-5  items-center py-3 cursor-pointer border-b-2 border-b-gray-200 '>
            <div className="flex flex-row items-center space-x-1.5">
                <Avatar />
                <div className="flex flex-col ">
                    <p className="text-xs text-gray-600 font-bold">Admin</p>
                    {onlineUser ?
                        <div className="flex items-center">
                            <p className="text-xs text-gray-600 font-bold mr-1">online</p>
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 "></div>
                        </div> :
                        <p className="text-xs text-gray-600 font-bold">offline</p>}
                </div>
            </div>

            <div className='w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center'
                onClick={handleCloseChat}>
                <MinusIcon className='w-5' />
            </div>
        </div>
    );
};

export default ChatHeader;
