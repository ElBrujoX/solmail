import React, { FC } from 'react';
import { Message } from '../../types/message';

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
}

const MessageList: FC<MessageListProps> = ({ messages, loading }) => {
  if (loading) {
    return <div className="text-center">Loading messages...</div>;
  }

  if (messages.length === 0) {
    return <div className="text-center text-gray-500">No messages yet</div>;
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="bg-white p-4 rounded-lg shadow"
        >
          <div className="flex justify-between items-start">
            <div className="text-sm text-gray-500">
              From: {message.sender}
            </div>
            <div className="text-sm text-gray-400">
              {new Date(message.timestamp).toLocaleString()}
            </div>
          </div>
          <div className="mt-2">{message.content}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList; 