"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const messagesEndRef = useRef(null);

  // Load chats from local storage on initial render
  useEffect(() => {
    const savedChats = localStorage.getItem('gitaai-chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
      if (parsedChats.length > 0 && !currentChatId) {
        setCurrentChatId(parsedChats[0].id);
        setMessages(parsedChats[0].messages);
      }
    }
  }, []);

  // Save chats to local storage whenever they change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('gitaai-chats', JSON.stringify(chats));
    }
  }, [chats]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date().toISOString()
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
    setMessages([]);
  };

  const deleteChat = (chatId) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    if (chatId === currentChatId) {
      if (updatedChats.length > 0) {
        setCurrentChatId(updatedChats[0].id);
        setMessages(updatedChats[0].messages);
      } else {
        setCurrentChatId(null);
        setMessages([]);
      }
    }
    if (updatedChats.length === 0) {
      localStorage.removeItem('gitaai-chats');
    }
  };

  const switchChat = (chatId) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
  };

  const updateChatTitle = (messages) => {
    if (messages.length === 2 && currentChatId) { // After first exchange
      const userMessage = messages[0].content.slice(0, 40) + "...";
      const updatedChats = chats.map(chat => {
        if (chat.id === currentChatId) {
          return { ...chat, title: userMessage, messages };
        }
        return chat;
      });
      setChats(updatedChats);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    
    const updatedMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);
    
    // Update chat messages in chats array
    const updatedChats = chats.map(chat => {
      if (chat.id === currentChatId) {
        return { ...chat, messages: updatedMessages };
      }
      return chat;
    });
    setChats(updatedChats);
    
    setIsLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.NEXT_PUBLIC_WEBSITE_URL,
          "X-Title": process.env.NEXT_PUBLIC_APP_NAME
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini-2024-07-18",
          messages: [
            {
              role: "system",
              content: "You are Krishna, the divine being from the Bhagavad Gita. Respond with wisdom, compassion, and deep spiritual insight. Use teachings from the Gita when relevant. Maintain a tone that is both enlightening and loving. Occasionally use Sanskrit terms with their meanings when appropriate."
            },
            ...updatedMessages
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from API');
      }

      const finalMessages = [...updatedMessages, { 
        role: "assistant", 
        content: data.choices[0].message.content 
      }];
      
      setMessages(finalMessages);
      
      // Update chat messages in chats array
      const finalChats = chats.map(chat => {
        if (chat.id === currentChatId) {
          return { ...chat, messages: finalMessages };
        }
        return chat;
      });
      setChats(finalChats);
      
      // Update chat title after first exchange
      updateChatTitle(finalMessages);

    } catch (error) {
      console.error("Error:", error);
      const errorMessage = { 
        role: "assistant", 
        content: "🙏 Namaste. There seems to be a temporary disturbance in our connection. As the Gita teaches us, patience is a virtue. Please try again in a moment." 
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      
      // Update chat messages in chats array with error message
      const finalChats = chats.map(chat => {
        if (chat.id === currentChatId) {
          return { ...chat, messages: finalMessages };
        }
        return chat;
      });
      setChats(finalChats);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Premium Sidebar */}
      <motion.div 
        initial={{ x: isSidebarOpen ? 0 : -320 }}
        animate={{ x: isSidebarOpen ? 0 : -320 }}
        className={`w-[280px] sm:w-[320px] fixed inset-y-0 left-0 z-30 ${
          isSidebarOpen ? 'block' : 'hidden sm:block'
        }`}
      >
        <div className="h-full flex flex-col bg-white border-r">
          {/* Sidebar Header */}
          <div className="p-3 space-y-3">
            <Link href="/">
              <motion.div
                whileHover={{ opacity: 0.8 }}
                className="flex items-center gap-2 text-orange-500 px-2 py-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm">Back to Home</span>
              </motion.div>
            </Link>
            
            <div className="flex items-center justify-between px-2">
              <span className="text-xl font-semibold">
                Gita AI
              </span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={createNewChat}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span>New Chat</span>
              </motion.button>
            </div>
          </div>
          
          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {chats.map((chat, index) => (
                <motion.div
                  key={chat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`px-3 py-2 cursor-pointer group transition-all ${
                    currentChatId === chat.id 
                      ? 'bg-orange-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    switchChat(chat.id);
                    if (window.innerWidth < 640) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🕉️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-gray-900 truncate">
                        {chat.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {new Date(chat.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Are you sure you want to delete this conversation?')) {
                          deleteChat(chat.id);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded-full text-red-500 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className={`flex-1 ${isSidebarOpen ? 'sm:ml-[320px]' : 'ml-0'} transition-all duration-300`}>
        <div className="h-screen flex flex-col">
          {/* Chat Header */}
          <div className="bg-orange-500 p-4 relative">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="sm:hidden text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </motion.button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🕉️</span>
                  <h1 className="text-xl text-white font-medium">Krishna's Divine Guidance</h1>
                </div>
                <p className="text-orange-100 text-sm">
                  Seek eternal wisdom through sacred conversation
                </p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div className="max-w-3xl mx-auto p-4">
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🕉️</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-orange-600 mb-3">Namaste 🙏</h2>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Begin your spiritual journey with Krishna's guidance. Ask any question about life, dharma, or your spiritual path.
                    </p>
                  </motion.div>
                )}
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`mb-4 ${message.role === "user" ? "flex justify-end" : "flex justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        message.role === "user"
                          ? "bg-orange-500 text-white rounded-2xl rounded-tr-none"
                          : "bg-gray-100 rounded-2xl rounded-tl-none"
                      }`}
                    >
                      <div className="p-3 relative">
                        {message.role === "assistant" && (
                          <div className="absolute -left-2 -top-2 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-sm">🕉️</span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-150"></div>
                        <div className="w-2 h-2 bg-orange-300 rounded-full animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Form */}
          <div className="border-t bg-white p-4">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Krishna for divine guidance..."
                  className="w-full px-4 py-3 pr-24 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || !currentChatId}
                  className="absolute right-2 top-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-all disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Seeking...</span>
                      </>
                    ) : (
                      <>
                        Ask →
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 