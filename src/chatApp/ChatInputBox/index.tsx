import React, { useState } from "react";
import socket from "../../socket";
import { authSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";


const ChatInputBox: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const user = useSelector(authSelector);

    const userName = user.userName;
    const userId = user.id;
    const dataMessage = { message, userName }

    const handleSendMessage = () => {
        socket.emit('messageToRoom', { roomId: `admin${userId}`, dataMessage });
        setMessage('');
    };

    return (
        <div className="flex gap-2 px-5 py-3 bg-white w-100 overflow-hidden rounded-bl-xl ">
            <input
                type="text"
                className="w-full block py-2 pl-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                id="message-box"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button
                className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 "
                type="button"
                onClick={handleSendMessage}
            >
                Send
            </button>
        </div>
    );
};

export default ChatInputBox;
