
export const DOMAINS = ['Biomedical', 'General Knowledge', 'Legal', 'Customer Support', 'Finance'] as const;
export type Domain = typeof DOMAINS[number];

export interface RagDocument {
  id: string;
  domain: Domain;
  question: string;
  context: string;
  answer: string; 
}

export type MessageSender = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  sources?: RagDocument[];
}
