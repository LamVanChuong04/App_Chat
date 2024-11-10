import React from 'react';
import useConversation from '../zustand/useConversation';

const MessageList = () => {
    const { messages } = useConversation();

    return (
        <div>
            {messages.length === 0 ? (
                <p>No messages yet.</p>
            ) : (
                messages.map((msg, index) => (
                    <div key={index} style={{ fontFamily: msg.fontFamily, color: msg.color, fontSize: msg.fontSize }}>
                        {msg.text}
                    </div>
                ))
            )}
        </div>
    );
};

export default MessageList;
