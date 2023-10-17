import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { authSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { dataMess } from "../../types";
import Message from "../Message";

const ChatContent: React.FC = () => {
    const user = useSelector(authSelector);
    const userId = user.id;
    const [dataMess, setDataMessage] = useState<dataMess[]>([]);

    useEffect(() => {
        socket.connect();
        socket.emit('joinRoom', { roomId: `admin${userId}` });
        socket.on('messageToClient', ({ dataMessage }) => {
            setDataMessage((prevMessages) => [...prevMessages, dataMessage]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return (

        <div className="flex-1 py-1 px-2 overflow-auto">
            <div>
                {dataMess.map((item, index) => <div key={index}><Message message={item} /></div>)}
            </div>
        </div>

    );
};

export default ChatContent;
