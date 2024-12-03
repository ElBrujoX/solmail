import React from 'react';
import Layout from '../components/layout/Layout';
import ComposeMessage from '../components/message/ComposeMessage';
import { useWallet } from '@solana/wallet-adapter-react';

export default function ComposePage() {
  const { connected } = useWallet();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Compose Message</h1>
        {!connected ? (
          <div className="text-center text-gray-600">
            Please connect your wallet to send messages
          </div>
        ) : (
          <ComposeMessage />
        )}
      </div>
    </Layout>
  );
} 