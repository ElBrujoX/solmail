import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import MessageList from '../components/message/MessageList';
import { useMessages } from '../hooks/useMessages';
import { useWallet } from '@solana/wallet-adapter-react';

export default function InboxPage() {
  const { connected } = useWallet();
  const { messages, loading, error } = useMessages();

  if (!connected) {
    return (
      <Layout>
        <div className="text-center text-gray-600">
          Please connect your wallet to view messages
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Inbox</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <MessageList messages={messages} loading={loading} />
      </div>
    </Layout>
  );
} 