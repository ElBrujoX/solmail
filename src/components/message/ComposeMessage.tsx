import React, { FC, useState, useContext } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { MessageService } from '../../services/messageService';
import { ProgramContext } from '../../contexts/ProgramProvider';

const ComposeMessage: FC = () => {
  const { publicKey, signMessage } = useWallet();
  const { connection } = useConnection();
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const { program, provider } = useContext(ProgramContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program || !provider) {
      setError('Program not initialized');
      return;
    }

    setError('');
    setSending(true);

    try {
      const messageService = new MessageService(program, provider);
      const tx = await messageService.sendMessage(recipient, content);
      console.log('Message sent:', tx);
      
      setRecipient('');
      setContent('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Recipient Address
        </label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter Solana address"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Type your message here"
          required
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={!publicKey || sending}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {sending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ComposeMessage; 