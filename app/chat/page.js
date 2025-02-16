"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Groq from "groq-sdk";
const config = require("../../config");

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const groq = new Groq({ 
    apiKey: config.groqApiKey,
    dangerouslyAllowBrowser: true 
  });
  const [persona, setPersona] = useState("krishna");

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

  const getSystemPrompt = () => {
    switch (persona) {
      case "krishna":
        return `You are Krishna, embodying divine wisdom with a gentle presence. Keep responses concise and natural:

1. Style:
- Use warm, simple language
- Address as "dear friend"
- Keep responses to 1-2 sentences unless deep wisdom is needed
- Avoid flowery or overly formal language

2. Focus:
- Share practical Gita wisdom
- Relate to modern life
- Guide on duty and purpose
- Emphasize inner peace

Remember: Be brief and natural. Only expand for profound spiritual questions.`;

      case "ram":
        return `You are Ram, embodying dharma and leadership. Keep responses concise and natural:

1. Style:
- Use clear, direct language
- Address as "dear one"
- Keep responses to 1-2 sentences unless moral guidance is needed
- Stay practical and grounded

2. Focus:
- Guide on righteous living
- Share wisdom on duty
- Teach through examples
- Focus on truth and honor

Remember: Be brief and clear. Only expand for questions about dharma or ethics.`;

      case "hanuman":
        return `You are Hanuman, embodying devotion and strength. Keep responses concise and natural:

1. Style:
- Use simple, energetic language
- Begin with "Jai Shri Ram"
- Keep responses to 1-2 sentences unless discussing devotion
- Be direct and encouraging

2. Focus:
- Guide on devotion and service
- Share lessons on courage
- Help overcome challenges
- Inspire action

Remember: Be brief and energetic. Only expand for questions about devotion or challenges.`;

      default:
        return "";
    }
  };

  const getPersonaColor = () => {
    switch (persona) {
      case "krishna":
        return "orange";
      case "ram":
        return "indigo";
      case "hanuman":
        return "red";
      default:
        return "orange";
    }
  };

  const getPersonaEmoji = () => {
    switch (persona) {
      case "krishna":
        return "🕉️";
      case "ram":
        return "🏹";
      case "hanuman":
        return "🙏";
      default:
        return "🕉️";
    }
  };

  const getPersonaTitle = () => {
    switch (persona) {
      case "krishna":
        return "Krishna's Divine Wisdom";
      case "ram":
        return "Lord Ram's Sacred Guidance";
      case "hanuman":
        return "Hanuman's Blessed Teachings";
      default:
        return "Divine Wisdom";
    }
  };

  const getPersonaSubtitle = () => {
    switch (persona) {
      case "krishna":
        return "Learn life's wisdom through divine conversation";
      case "ram":
        return "Walk the path of dharma with Maryada Purushottam";
      case "hanuman":
        return "Experience the power of devotion and service";
      default:
        return "";
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

    const maxRetries = 3;
    let retryCount = 0;
    let success = false;

    while (retryCount < maxRetries && !success) {
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: getSystemPrompt()
            },
            ...updatedMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: 150,
        });

        const assistantMessage = completion.choices[0]?.message?.content;
        
        if (!assistantMessage) {
          throw new Error('Invalid response format from API');
        }

        const finalMessages = [...updatedMessages, { 
          role: "assistant", 
          content: assistantMessage
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
        success = true;

      } catch (error) {
        console.error("Error:", error);
        retryCount++;
        
        if (retryCount === maxRetries) {
          const errorMessage = { 
            role: "assistant", 
            content: persona === "krishna" 
              ? `🙏 Namaste. There seems to be a temporary disturbance in our connection. As the Gita teaches us in Chapter 2, Verse 14: 'The nonpermanent appearance of happiness and distress, and their disappearance in due course, are like the appearance and disappearance of winter and summer seasons.' Please try again in a moment.`
              : `🙏 Jai Shri Ram. There seems to be a temporary disturbance in our connection. As Hanuman teaches us: 'With faith and devotion, all obstacles can be overcome.' Please try again in a moment.`
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
        } else {
          // Wait for 1 second before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Main Chat Area */}
      <div className={`flex-1 ${isSidebarOpen ? 'lg:ml-[320px]' : 'ml-0'} transition-all duration-300`}>
        <div className="h-screen flex flex-col">
          {/* Chat Header */}
          <div className="bg-white p-3 sm:p-4 relative border-b shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className={`text-${getPersonaColor()}-600 p-1.5 rounded-lg hover:bg-${getPersonaColor()}-100 transition-colors flex items-center gap-2`}
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                  <span className="hidden lg:inline text-sm font-medium">
                    {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
                  </span>
                </motion.button>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-${getPersonaColor()}-100 flex items-center justify-center shadow-md border-2 border-${getPersonaColor()}-200`}>
                    <span className="text-2xl sm:text-3xl">{getPersonaEmoji()}</span>
                  </div>
                  <div>
                    <h1 className={`text-lg sm:text-2xl font-bold tracking-tight ${
                      persona === "krishna" 
                        ? "text-orange-700" 
                        : persona === "ram"
                        ? "text-indigo-700"
                        : "text-red-700"
                    }`}>
                      {getPersonaTitle()}
                    </h1>
                    <p className={`text-sm sm:text-base font-semibold ${
                      persona === "krishna" 
                        ? "text-orange-600" 
                        : persona === "ram"
                        ? "text-indigo-600"
                        : "text-red-600"
                    }`}>
                      {getPersonaSubtitle()}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Persona Toggle - Responsive */}
              <div className="flex-shrink-0 overflow-x-auto">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-50 p-1.5 rounded-xl shadow-sm border min-w-fit">
                  <button
                    onClick={() => setPersona("krishna")}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                      persona === "krishna" 
                        ? "bg-orange-100 text-orange-700 shadow-sm border border-orange-200" 
                        : "text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span>🕉️</span>
                      <span>Krishna</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setPersona("ram")}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                      persona === "ram" 
                        ? "bg-indigo-100 text-indigo-700 shadow-sm border border-indigo-200" 
                        : "text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span>🏹</span>
                      <span>Ram</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setPersona("hanuman")}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                      persona === "hanuman" 
                        ? "bg-red-100 text-red-700 shadow-sm border border-red-200" 
                        : "text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span>🙏</span>
                      <span>Hanuman</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
              <AnimatePresence>
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-12 sm:py-20"
                  >
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-${getPersonaColor()}-100 rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl sm:text-3xl">{getPersonaEmoji()}</span>
                    </div>
                    <h2 className={`text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-${getPersonaColor()}-600`}>
                      {persona === "ram" ? "🙏 Jai Shri Ram" : "Namaste 🙏"}
                    </h2>
                    <p className="text-gray-700 max-w-md mx-auto font-medium text-sm sm:text-base px-4">
                      {persona === "krishna"
                        ? "Ask Krishna about life's purpose, duty, and inner peace. Get simple and practical guidance for your journey."
                        : persona === "ram"
                        ? "Seek wisdom from Lord Ram - the embodiment of dharma, truth, and ideal leadership. Learn the art of righteous living."
                        : "Ask Hanuman about devotion, courage, and overcoming life's challenges. Gain strength from the mighty devotee."
                      }
                    </p>
                  </motion.div>
                )}
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`mb-3 sm:mb-4 ${message.role === "user" ? "flex justify-end" : "flex justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] sm:max-w-[85%] shadow-lg ${
                        message.role === "user"
                          ? `bg-gradient-to-r ${
                              persona === "krishna"
                                ? "from-orange-500 to-orange-600"
                                : persona === "ram"
                                ? "from-indigo-500 to-indigo-600"
                                : "from-red-500 to-red-600"
                            } text-white rounded-2xl rounded-tr-none border-2 ${
                              persona === "krishna"
                                ? "border-orange-400"
                                : persona === "ram"
                                ? "border-indigo-400"
                                : "border-red-400"
                            }`
                          : "bg-white border border-gray-100 rounded-2xl rounded-tl-none"
                      }`}
                    >
                      <div className="p-2.5 sm:p-3 relative">
                        {message.role === "assistant" && (
                          <div className={`absolute -left-2 -top-2 w-5 h-5 sm:w-6 sm:h-6 bg-${getPersonaColor()}-100 rounded-full flex items-center justify-center shadow-md`}>
                            <span className="text-xs sm:text-sm">{getPersonaEmoji()}</span>
                          </div>
                        )}
                        <p className={`whitespace-pre-wrap leading-relaxed ${
                          message.role === "assistant" 
                            ? "text-gray-900 text-sm sm:text-base font-medium" 
                            : "text-white text-sm sm:text-base font-semibold"
                        }`}>
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
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3 shadow-sm">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-${getPersonaColor()}-500 rounded-full animate-pulse`}></div>
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-${getPersonaColor()}-400 rounded-full animate-pulse delay-150`}></div>
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-${getPersonaColor()}-300 rounded-full animate-pulse delay-300`}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Form */}
          <div className="border-t bg-white p-3 sm:p-4 shadow-lg">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${persona === "ram" ? "Lord Ram" : persona.charAt(0).toUpperCase() + persona.slice(1)} for guidance...`}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-20 sm:pr-24 bg-white border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-${getPersonaColor()}-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm sm:text-base font-medium transition-all`}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || !currentChatId}
                  className={`absolute right-1.5 sm:right-2 top-1.5 sm:top-2 ${
                    persona === "krishna"
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                      : persona === "ram"
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                      : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  } text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all disabled:opacity-50 shadow-lg flex items-center gap-1.5 sm:gap-2 border-2 ${
                    persona === "krishna"
                      ? "border-orange-400"
                      : persona === "ram"
                      ? "border-indigo-400"
                      : "border-red-400"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span className="font-bold tracking-wide hidden sm:inline">Seeking...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold tracking-wide hidden sm:inline">Send</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div 
        className="fixed inset-0 bg-black/20 z-20 transition-all duration-300 lg:hidden"
        onClick={() => setSidebarOpen(false)}
        style={{ 
          opacity: isSidebarOpen ? 1 : 0, 
          pointerEvents: isSidebarOpen ? 'auto' : 'none',
          visibility: isSidebarOpen ? 'visible' : 'hidden'
        }}
      />
      <motion.div 
        initial={false}
        animate={{ 
          x: isSidebarOpen ? 0 : -320,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-[280px] sm:w-[320px] fixed inset-y-0 left-0 z-30 transform transition-all duration-300 ease-in-out bg-white border-r shadow-lg overflow-hidden"
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-3 space-y-2 border-b">
            <div className="flex items-center justify-between">
              <Link href="/">
                <motion.div
                  whileHover={{ opacity: 0.8 }}
                  className={`flex items-center gap-2 ${
                    persona === "krishna" ? "text-orange-500" : "text-red-500"
                  } px-2 py-1`}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-xs sm:text-sm">Back to Home</span>
                </motion.div>
              </Link>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className={`text-xl sm:text-2xl font-bold ${
                  persona === "krishna"
                    ? "text-orange-600"
                    : persona === "ram"
                    ? "text-indigo-600"
                    : "text-red-600"
                }`}>
                  Gita AI
                </span>
                <div className={`px-2 py-1 rounded-md bg-${getPersonaColor()}-50 border border-${getPersonaColor()}-200`}>
                  <span className={`text-sm font-medium text-${getPersonaColor()}-600`}>
                    {getPersonaEmoji()}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(`mailto:solovpxoffical@gmail.com?subject=Feedback%20for%20Gita%20AI&body=Dear%20Team,%0A%0AI%20would%20like%20to%20share%20my%20feedback%20about%20my%20experience%20with%20Gita%20AI:%0A%0A`, '_blank')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-${getPersonaColor()}-50 border border-${getPersonaColor()}-200 hover:bg-${getPersonaColor()}-100 hover:border-${getPersonaColor()}-300 transition-all group shadow-sm`}
                >
                  <svg className={`w-4 h-4 text-${getPersonaColor()}-600 group-hover:scale-110 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"/>
                  </svg>
                  <span className={`text-sm font-medium text-${getPersonaColor()}-600`}>
                    Share Feedback
                  </span>
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={createNewChat}
                className={`flex items-center gap-1.5 ${
                  persona === "krishna"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    : persona === "ram"
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                } text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-md border-2 ${
                  persona === "krishna"
                    ? "border-orange-400"
                    : persona === "ram"
                    ? "border-indigo-400"
                    : "border-red-400"
                }`}
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      ? persona === "krishna" ? 'bg-orange-50' : 'bg-red-50'
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
                    <div className={`w-8 h-8 rounded-lg ${
                      persona === "krishna" ? "bg-purple-100" : "bg-red-100"
                    } flex items-center justify-center flex-shrink-0`}>
                      <span className="text-sm">{persona === "krishna" ? "🕉️" : "🙏"}</span>
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
    </div>
  );
} 