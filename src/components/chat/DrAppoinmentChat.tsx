'use client';

import React, { useState, useRef, useEffect } from 'react';
import { chatApi } from '@/api/chat';
import {
  MessageSquare,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Calendar,
  Search,
} from 'lucide-react';
import Link from 'next/link';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const SUGGESTIONS = [
  'Find an experienced cardiologist',
  'Check available appointment slots today',
  'What should I do for severe migraine?',
  'How do I cancel or reschedule my booking?',
];

export function DrAppoinmentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Hello! I am Dr.Appoinment Assistant powered by Gemini AI. How can I help you find a doctor, check open slots, or book an appointment today?',
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate or restore conversation ID
    if (typeof window !== 'undefined') {
      let saved = localStorage.getItem('dr_app_chat_conv_id');
      if (!saved) {
        saved = 'conv_' + Math.random().toString(36).substring(2, 10);
        localStorage.setItem('dr_app_chat_conv_id', saved);
      }
      setConversationId(saved);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await chatApi.sendMessage({
        message: textToSend,
        conversationId: conversationId || 'conv_default',
      });

      const botMsg: ChatMessage = {
        id: 'msg_res_' + Date.now(),
        sender: 'bot',
        text: res.response || 'I have processed your request. Let me know if you need anything else.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'msg_err_' + Date.now(),
        sender: 'bot',
        text:
          err.response?.data?.message ||
          'I am having trouble connecting to the hospital backend. Please ensure the backend is running at http://localhost:8080 or explore our doctor directory directly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    const newConvId = 'conv_' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('dr_app_chat_conv_id', newConvId);
    setConversationId(newConvId);
    setMessages([
      {
        id: 'init-reset',
        sender: 'bot',
        text: 'New session started. How can I assist your health or appointment scheduling needs?',
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-5 py-3.5 rounded-full shadow-xl hover:shadow-teal-600/30 transition-all duration-300 transform hover:-translate-y-0.5"
          aria-label="Open AI Assistant"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-200"></span>
          </span>
          <Bot className="w-5 h-5" />
          <span className="font-semibold text-sm">Ask AI Doctor Assistant</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[92vw] sm:w-[420px] h-[580px] flex flex-col border border-gray-100 overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm">Dr.Appoinment AI</h3>
                  <span className="bg-teal-800/60 text-[10px] font-medium px-2 py-0.5 rounded-full text-teal-100">
                    Gemini Clinical
                  </span>
                </div>
                <p className="text-[11px] text-teal-100/90">24/7 Smart Health & Slot Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetConversation}
                title="Restart chat session"
                className="p-1.5 text-teal-100 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-teal-100 hover:text-white hover:bg-white/10 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {m.text}
                  <span
                    className={`block text-[10px] mt-1 ${
                      m.sender === 'user' ? 'text-teal-200 text-right' : 'text-gray-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-gray-500 italic bg-white p-3 rounded-2xl border border-gray-100 w-fit">
                <Sparkles className="w-4 h-4 text-teal-600 animate-spin" />
                <span>Dr.Appoinment AI is analyzing & querying clinic slots...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {SUGGESTIONS.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSend(sug)}
                className="text-[11px] bg-gray-100 hover:bg-teal-50 hover:text-teal-700 text-gray-700 px-2.5 py-1 rounded-full transition shrink-0"
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input box */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about doctors, symptoms, slots..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white p-2.5 rounded-xl shadow-sm transition"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
