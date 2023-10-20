import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../../assets/Avatar';
import { PropUser } from '../../types';
import Message from '../../chatApp/Message';
import requestApi from '../../helpers/api';
import InputEmoji from 'react-input-emoji'
import socket from '../../socket';

interface MessageProps {
    senderId: number;
    text: string;
    chatId: number;
    createdAt: Date;
}

interface BodyChatProps {
    currentChat: PropUser | null;
    currentUser: PropUser;
    chatId?: number;
}

const BodyChat: React.FC<BodyChatProps> = ({ currentChat, currentUser, chatId }) => {
    const scroll = useRef<HTMLDivElement>(null);

    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    const handleChange = (newMessage: React.SetStateAction<string>) => {
        setNewMessage(newMessage)
    }
    const handleSend = async (e: React.MouseEvent) => {
        e.preventDefault()
        const message = {
            senderId: currentUser.id,
            text: newMessage,
            chatId: chatId,
        }
        const receiverId = currentChat?.id;

        setSendMessage({ ...message, receiverId })
        try {
            const { data } = await requestApi('message', 'POST', message);
            setMessages([...messages, data]);
            setNewMessage('');

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await requestApi(`message/${chatId}`, 'GET', []);
                setMessages(data)
            } catch (error) {
                console.log(error);
            }
        }
        if (chatId !== null) fetchMessages();
    }, [chatId]);

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

    useEffect(() => {
        if (receivedMessage !== null) {
            setMessages([...messages, receivedMessage]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receivedMessage]);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            {currentChat &&
                <div className='col-span-3 grid grid-rows-[10vh,67vh,10vh] bg-slate-50 '>
                    <div className="pl-3 py-3 transition-all flex items-center gap-2 border-b bg-white">
                        <Avatar />
                        <div>
                            <p className="text-base font-semibold">{currentChat?.userName}</p>
                            <p className="font-normal text-gray-500">{currentChat?.email}</p>
                        </div>
                    </div>
                    <div className='overflow-auto'>
                        <div className=''>
                            <div className=" px-6 py-1 ">
                                {messages.map((item, index) => <div ref={scroll} key={index}><Message message={item} /></div>)}
                            </div>
                        </div>
                    </div>
                    <div className='border-r h-20 flex items-center bg-white group border-t border-blue-500'>
                        <InputEmoji
                            value={newMessage}
                            onChange={handleChange}
                        />
                        <div className=" cursor-pointer px-6 py-2 text-xs font-medium text-center text-white bg-blue-500 mr-10"
                            onClick={handleSend}>
                            Send
                        </div>
                    </div>
                </div>

            }
        </>
    );
};

export default BodyChat;



