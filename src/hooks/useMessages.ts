import { useContext, useCallback, useEffect } from 'react';
import { ProgramContext } from '../contexts/ProgramProvider';
import { useMessageStore } from '../stores/messageStore';
import { MessageService } from '../services/messageService';
import { MessageRetrieval } from '../services/messageRetrieval';
import { useWallet } from '@solana/wallet-adapter-react';

export function useMessages() {
  const { program, provider } = useContext(ProgramContext);
  const { connected } = useWallet();
  const { messages, loading, error, setMessages, setLoading, setError } = useMessageStore();

  const fetchMessages = useCallback(async () => {
    if (!program || !provider || !connected) return;

    setLoading(true);
    setError(null);

    try {
      const retrieval = new MessageRetrieval(program, provider);
      const msgs = await retrieval.getMessages();
      setMessages(msgs);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [program, provider, connected]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = useCallback(async (recipient: string, content: string) => {
    if (!program || !provider) {
      throw new Error('Program not initialized');
    }

    setLoading(true);
    setError(null);

    try {
      const messageService = new MessageService(program, provider);
      const tx = await messageService.sendMessage(recipient, content);
      await fetchMessages(); // Refresh messages after sending
      return tx;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [program, provider, fetchMessages]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    refreshMessages: fetchMessages,
  };
} 