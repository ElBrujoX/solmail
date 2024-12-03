import { AnchorProvider, Program, web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Message } from '../types/message';
import { encrypt } from '../utils/encryption';

export class MessageService {
  constructor(
    private program: Program,
    private provider: AnchorProvider
  ) {}

  async sendMessage(recipientAddress: string, content: string): Promise<string> {
    const recipient = new PublicKey(recipientAddress);
    const sender = this.provider.wallet.publicKey;
    
    // Encrypt message content
    const encryptedContent = await encrypt(content, recipient);
    const contentHash = Buffer.from(encryptedContent).toString('base64');
    
    const [messageAccount] = await this.getMessagePDA(sender, recipient);
    
    const tx = await this.program.methods
      .sendMessage(contentHash, new Date().getTime())
      .accounts({
        sender: sender,
        recipient: recipient,
        message: messageAccount,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    return tx;
  }

  private async getMessagePDA(sender: PublicKey, recipient: PublicKey) {
    const timestamp = new Date().getTime();
    return await PublicKey.findProgramAddress(
      [
        Buffer.from('message'),
        sender.toBuffer(),
        recipient.toBuffer(),
        Buffer.from(timestamp.toString())
      ],
      this.program.programId
    );
  }
} 