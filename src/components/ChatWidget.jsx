// /src/components/ChatWidget.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Xin chào! Tôi là trợ lý ảo của Trường Đại học Hùng Vương. Tôi có thể hỗ trợ bạn về tuyển sinh, ngành học, học phí và nhiều thông tin khác.",
            sender: "bot",
        },
    ]);
    const [input, setInput] = useState("");
    const [waiting, setWaiting] = useState(false);
    const messagesRef = useRef(null);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [messages]);

    const appendMessage = (text, sender) => {
        setMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                text,
                sender,
            },
        ]);
    };

    const handleSendMessage = async (messageText) => {
        const text = messageText || input.trim();
        if (!text || waiting) return;

        appendMessage(text, "user");
        setInput("");
        setWaiting(true);
        appendMessage("Đang trả lời...", "bot");

        try {
            const res = await fetch("/chat.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();
            setMessages((prev) => [
                ...prev.slice(0, -1),
                { id: prev.length + 1, text: data.reply || "...", sender: "bot" },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev.slice(0, -1),
                { id: prev.length + 1, text: "Lỗi server, thử lại!", sender: "bot" },
            ]);
        } finally {
            setWaiting(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickQuestions = [
        "Địa chỉ",
        "Bạn là ai",
        "Học phí",
        "Ăn gì chưa",
        "Liên hệ",
    ];

    return (
        <>
            {/* Nút mở chat */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-40 transition-all duration-300 ${
                    isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <MessageCircle className="w-6 h-6 text-white" />
                )}
            </motion.button>

            {/* Cửa sổ chat */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-blue-600 text-white p-4 flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Trợ lý ảo DHV</h3>
                                <p className="text-sm text-blue-100">Luôn sẵn sàng hỗ trợ bạn</p>
                            </div>
                        </div>

                        {/* Nội dung chat */}
                        <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`flex items-start space-x-2 max-w-[80%] ${
                                            msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                                        }`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                                                msg.sender === "user" ? "bg-blue-600" : "bg-gray-500"
                                            }`}
                                        >
                                            {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div
                                            className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                                                msg.sender === "user"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-white text-gray-800 border border-gray-200"
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Gợi ý nhanh */}
                        <div className="px-4 py-2 border-t border-gray-200 bg-white">
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSendMessage(q)}
                                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Nhập tin nhắn */}
                        <div className="p-4 border-t border-gray-200 bg-white">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 text-black px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={waiting}
                                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;
