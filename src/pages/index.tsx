import React from 'react';
import Layout from '../components/layout/Layout';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Home() {
  const { connected } = useWallet();

  return (
    <Layout>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Welcome to Solana Email DApp
        </h2>
        {!connected ? (
          <p className="text-gray-600">Connect your wallet to get started</p>
        ) : (
          <p className="text-gray-600">You're connected! Ready to send messages</p>
        )}
      </div>
    </Layout>
  );
} 