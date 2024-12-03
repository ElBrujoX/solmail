use anchor_lang::prelude::*;

declare_id!("your_program_id");

#[program]
pub mod solana_email_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn send_message(
        ctx: Context<SendMessage>,
        content_hash: String,
        timestamp: i64,
    ) -> Result<()> {
        let message = &mut ctx.accounts.message;
        let sender = &ctx.accounts.sender;

        message.sender = sender.key();
        message.recipient = ctx.accounts.recipient.key();
        message.content_hash = content_hash;
        message.timestamp = timestamp;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct SendMessage<'info> {
    #[account(mut)]
    pub sender: Signer<'info>,
    /// CHECK: Recipient address validation is handled by the client
    pub recipient: AccountInfo<'info>,
    #[account(
        init,
        payer = sender,
        space = 8 + 32 + 32 + 64 + 8,
        seeds = [
            b"message",
            sender.key().as_ref(),
            recipient.key().as_ref(),
            &Clock::get()?.unix_timestamp.to_le_bytes()
        ],
        bump
    )]
    pub message: Account<'info, Message>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Message {
    pub sender: Pubkey,
    pub recipient: Pubkey,
    pub content_hash: String,
    pub timestamp: i64,
} 