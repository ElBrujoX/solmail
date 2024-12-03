import { PublicKey } from '@solana/web3.js';
import * as bs58 from 'bs58';

export async function encrypt(content: string, recipientPubkey: PublicKey): Promise<Uint8Array> {
  // TODO: Implement proper end-to-end encryption
  // This is a placeholder that just converts the content to bytes
  return new TextEncoder().encode(content);
}

export async function decrypt(encryptedContent: Uint8Array): Promise<string> {
  // TODO: Implement proper decryption
  return new TextDecoder().decode(encryptedContent);
} 