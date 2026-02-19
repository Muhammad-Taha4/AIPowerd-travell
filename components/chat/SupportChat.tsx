'use client';

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { FaHeadset, FaPaperPlane, FaTimes, FaMinus, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([
        { role: 'agent', content: 'Hello! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const socketRef = useRef<any>(null);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io('http://localhost:5000');

        socketRef.current.on('connect', () => {
            console.log('Connected to support stream');
        });

        socketRef.current.on('emergency_alert', (data: any) => {
            setMessages(prev => [...prev, { role: 'agent', content: `[SYSTEM] ${data.message}` }]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMsg = { role: 'user', content: input };
        setMessages([...messages, newMsg]);

        // Mocking AI response for Support Chat
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'agent', content: "I've received your message. An agent will be with you shortly." }]);
        }, 1000);

        setInput('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-80 sm:w-96 h-[450px] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
                        style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center justify-between border-b border-white/5" style={{ background: 'linear-gradient(90deg, #2463eb, #3b82f6)' }}>
                            <div className="flex items-center gap-3 text-white">
                                <FaHeadset />
                                <div>
                                    <p className="text-sm font-bold">24/7 Support</p>
                                    <p className="text-[10px] opacity-80">AI-Powered & Human-Ready</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-none'
                                            : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={sendMessage} className="p-4 border-t border-white/5 bg-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-12 text-sm text-white focus:outline-none focus:border-blue-500/50"
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-blue-300 transition-colors">
                                    <FaPaperPlane />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl shadow-lg relative overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)' }}
            >
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                {isOpen ? <FaMinus className="relative" /> : <FaHeadset className="relative" />}
            </motion.button>
        </div>
    );
}
