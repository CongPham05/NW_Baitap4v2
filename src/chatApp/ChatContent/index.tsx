import React, { useEffect, useRef, useState } from "react";
import { authSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";
import Message from "../Message";
import InputEmoji from 'react-input-emoji';
import requestApi from "../../helpers/api";
import socket from "../../socket";

interface MessageProps {
    senderId: number;
    text: string;
    chatId: number;
    createdAt: Date;
}
interface SendMessageProps {
    chatId: number;
    receiverId: number;
    senderId: number;
    text: string;
    createdAt: Date;
}
interface ChatContentProps {
    chatId: number;
}

const ChatContent: React.FC<ChatContentProps> = ({ chatId }) => {
    const auth = useSelector(authSelector);
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const scroll = useRef<HTMLDivElement>(null);
    const [sendMessage, setSendMessage] = useState<SendMessageProps | null>(null);
    const [receivedMessage, setReceivedMessage] = useState<SendMessageProps | null>(null);

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
            senderId: auth.id,
            text: newMessage,
            chatId: chatId,
        }
        try {
            const { data } = await requestApi('message', 'POST', message);
            setSendMessage({
                chatId,
                senderId: auth.id,
                text: newMessage,
                createdAt: data.createdAt,
                receiverId: 1
            });
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
        if (receivedMessage !== null && receivedMessage?.chatId === chatId) {
            const { chatId, senderId, text, createdAt } = receivedMessage;
            setMessages(
                [
                    ...messages,
                    { chatId, senderId, text, createdAt }
                ])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receivedMessage]);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    return (
        <>
            <div className="flex-1 py-1 px-2 overflow-auto">
                {messages.map((item, index) => <div ref={scroll} key={index}><Message message={item} /></div>)}
            </div>
            <div className="flex gap-2 px-5 py-3 bg-white w-100  rounded-bl-xl ">
                <div className="flex-1">
                    <InputEmoji
                        value={newMessage}
                        onChange={handleChange}
                        onKeyDown={handleInputEnter}
                    />
                </div>
                <div className="flex items-center cursor-pointer text-xs font-medium text-center text-white"
                    onClick={handleSend}>
                    <span className="bg-blue-500 px-3 py-2.5 rounded-md">Send</span>
                </div>
            </div>
        </>
    );
};

export default ChatContent;
