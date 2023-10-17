import React from "react";
import ChatContent from "./ChatContent";
import ChatInputBox from "./ChatInputBox";

const Chat: React.FC = () => {


    return (
        <div className=" h-[430px] flex flex-col">
            <ChatContent />
            <ChatInputBox />
        </div>
    );
};

export default Chat;
