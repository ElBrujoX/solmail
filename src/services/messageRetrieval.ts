import { Program, AnchorProvider } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Message } from '../types/message';
import { decrypt } from '../utils/encryption';

export class MessageRetrieval {
  constructor(
    private program: Program,
    private provider: AnchorProvider
  ) {}

  async getMessages(): Promise<Message[]> {
    const wallet = this.provider.wallet;
    const messages = await this.program.account.message.all([
      {
        memcmp: {
          offset: 8, // Discriminator
          bytes: wallet.publicKey.toBase58(),
        },
      },
    ]);

    return Promise.all(
      messages.map(async (m: any) => {
        const encryptedContent = Buffer.from(m.account.contentHash, 'base64');
        const content = await decrypt(encryptedContent);

        return {
          id: m.publicKey.toString(),
          sender: m.account.sender.toString(),
          recipient: m.account.recipient.toString(),
          content,
          timestamp: m.account.timestamp.toNumber(),
        };
      })
    );
  }
} 