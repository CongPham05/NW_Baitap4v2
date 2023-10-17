import React from 'react'

interface ConfirmChatProps {
    handleShowAppChat: () => void;
}

const ConfirmChat: React.FC<ConfirmChatProps> = ({ handleShowAppChat }) => {
    return (
        <div className='h-56  p-5'>
            <h1 className='flex justify-center text-xl font-medium mb-4'>Chat with admin now!</h1>
            <h6 className='flex justify-center'>Xin chào! Hãy nhắn vào đây để được hỗ trợ</h6>
            <div className='flex justify-center mt-16'>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 w-full rounded-2xl "
                    onClick={handleShowAppChat}
                >
                    Bắt đầu chat
                </button>
            </div>
        </div>
    );
};

export default ConfirmChat;
