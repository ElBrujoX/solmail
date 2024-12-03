import React from 'react';
import type { AppProps } from 'next/app';
import WalletContextProvider from '../contexts/WalletContextProvider';
import { ProgramProvider } from '../contexts/ProgramProvider';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletContextProvider>
      <ProgramProvider>
        <Component {...pageProps} />
      </ProgramProvider>
    </WalletContextProvider>
  );
} 