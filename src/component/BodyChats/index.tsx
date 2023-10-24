import React, { useEffect, useRef, useState } from 'react'
import Avatar from '../../assets/Avatar';
import { PropUser } from '../../types';
import Message from '../../chatApp/Message';
import requestApi from '../../helpers/api';
import InputEmoji from 'react-input-emoji'

interface MessageProps {
    senderId: number;
    text: string;
    chatId: number | null;
    createdAt: Date;
}
interface SendMessageProps {
    chatId: number | null;
    receiverId?: number;
    senderId: number;
    text: string;
    createdAt: Date;
}
interface BodyChatProps {
    currentChat: PropUser | null;
    currentUser: PropUser;
    chatId: number | null;
    setSendMessage?: (message: SendMessageProps) => void;
    receivedMessage?: SendMessageProps;
}

const BodyChat: React.FC<BodyChatProps> = ({ currentChat, currentUser, chatId, setSendMessage, receivedMessage }) => {
    const scroll = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<MessageProps[]>([]);

    const handleChange = (newMessage: React.SetStateAction<string>) => {
        setNewMessage(newMessage)
    }
    const handleInputEnter = async (e: KeyboardEvent) => {
        if (e.key === 'Enter' && newMessage.length > 0) {
            handleSend();
        }
    };
    const handleSend = async () => {
        if (!newMessage.length) { return; }

        const message = {
            senderId: currentUser.id,
            text: newMessage,
            chatId: chatId,
        }
        try {
            const { data } = await requestApi('message', 'POST', message);
            if (setSendMessage) {
                setSendMessage({
                    chatId: data.chatId,
                    senderId: data.senderId,
                    text: data.text,
                    createdAt: data.createdAt,
                    receiverId: currentChat?.id
                });
            }
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
        if (receivedMessage !== null && receivedMessage?.chatId === chatId) {
            setMessages(
                [
                    ...messages,
                    {
                        chatId: receivedMessage.chatId,
                        senderId: receivedMessage.senderId,
                        text: receivedMessage.text,
                        createdAt: receivedMessage.createdAt
                    }

                ])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receivedMessage])

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            {currentChat ?
                <div className='col-span-3 grid grid-rows-[10vh,67vh,10vh] bg-slate-50 '>
                    <div className="pl-3 py-3 transition-all flex items-center gap-2 border-b bg-white">
                        <Avatar />
                        <div>
                            <p className="text-base font-semibold">{currentChat.userName}</p>
                            <p className="text-sm font-medium text-gray-500">{currentChat.email}</p>

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
                            onKeyDown={handleInputEnter}
                        />
                        <div className=" cursor-pointer px-6 py-2 text-xs font-medium text-center text-white bg-blue-500 mr-10"
                            onClick={handleSend}>
                            Send
                        </div>
                    </div>
                </div>
                :
                <div className='col-span-3 flex  mt-10 justify-center'>
                    <div className="text-xl font-medium">
                        Tap on a chat to start conversation...
                    </div>
                </div>

            }
        </>
    );
};

export default BodyChat;



