import React, { FC, ReactNode, useMemo } from 'react';
import { AnchorProvider, Program, Idl } from '@project-serum/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import idl from '../idl/solana_email_program.json';

const programID = new PublicKey('your_program_id');

export const ProgramContext = React.createContext<{
  program: Program | null;
  provider: AnchorProvider | null;
}>({
  program: null,
  provider: null,
});

export const ProgramProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(connection, wallet as any, {
      commitment: 'confirmed',
    });
  }, [connection, wallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    return new Program(idl as Idl, programID, provider);
  }, [provider]);

  return (
    <ProgramContext.Provider value={{ program, provider }}>
      {children}
    </ProgramContext.Provider>
  );
}; 