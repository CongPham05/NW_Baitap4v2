import React from "react";
import ChatContent from "./ChatContent";
interface Props {
    chatId?: number;
}
const Chat: React.FC<Props> = ({ chatId }) => {


    return (
        <div className=" h-[470px] flex flex-col">
            <ChatContent chatId={chatId} />
        </div>
    );
};

export default Chat;
