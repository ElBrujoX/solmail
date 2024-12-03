export interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: number;
  signature?: string;
}

export interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
} 