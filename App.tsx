
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Domain, MessageSender, RagDocument } from './types';
import { geminiService } from './services/geminiService';
import { ragService } from './services/ragService';
import DomainSelector from './components/DomainSelector';
import SourceDocuments from './components/SourceDocuments';
import { BrainCircuitIcon, SendIcon } from './components/icons';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'ai',
      text: "Welcome to the RAG System Demo! Please select a knowledge domain and ask a question. I'll retrieve relevant documents and generate an answer based on them.",
    },
  ]);
  const [query, setQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    if (!selectedDomain) {
       setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: "Please select a domain before asking a question.",
      }]);
      return;
    }

    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
    };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');

    // 1. Retrieval
    const retrievedDocs = ragService.retrieve(query, selectedDomain);

    // 2. Generation
    const aiResponseText = await geminiService.generateAnswer(query, retrievedDocs);

    const aiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: aiResponseText,
      sources: retrievedDocs,
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans">
      <header className="p-4 border-b border-slate-700/50 flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm">
        <BrainCircuitIcon />
        <div>
            <h1 className="text-lg font-bold text-sky-400">Real World RAG System</h1>
            <p className="text-xs text-slate-400">A Gemini-powered RAG demo for domain-specific Q&A</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0">
                  <BrainCircuitIcon />
                </div>
              )}
              <div className={`max-w-lg p-3 rounded-xl ${
                  msg.sender === 'user'
                    ? 'bg-slate-700 text-white'
                    : 'bg-slate-800 text-slate-200'
                }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                {msg.sender === 'ai' && msg.sources && <SourceDocuments sources={msg.sources} />}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <BrainCircuitIcon />
                </div>
              <div className="max-w-lg p-3 rounded-xl bg-slate-800">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="p-4 md:p-6 bg-slate-900 border-t border-slate-700/50">
        <div className="max-w-3xl mx-auto">
          <DomainSelector selectedDomain={selectedDomain} onSelectDomain={setSelectedDomain} />
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
             <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={selectedDomain ? `Ask a question about ${selectedDomain}...` : "First, select a domain above..."}
              disabled={isLoading}
              className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="p-3 bg-sky-500 rounded-lg text-white disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-sky-600 transition-colors"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default App;
