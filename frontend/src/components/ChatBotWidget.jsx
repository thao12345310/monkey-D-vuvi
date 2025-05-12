import React, { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";

const ChatBotWidget = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there 👋\nHow can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (trimmedInput) {
      const newMessage = {
        id: messages.length + 1,
        text: trimmedInput,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputValue("");

      // --- Phần giả lập bot trả lời (Bạn sẽ thay thế bằng logic thật) ---
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: `Okay, I received: "${trimmedInput}". How else can I assist?`,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
      // --- Kết thúc phần giả lập ---
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Nút mở khi cửa sổ đóng
  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-50"
        aria-label="Open Chat"
      >
        <FiMessageSquare size={24} />
      </button>
    );
  }

  // Giao diện đầy đủ khi cửa sổ mở
  return (
    <div className="fixed bottom-5 right-5 w-80 md:w-96 h-[500px] flex flex-col bg-white rounded-lg shadow-xl z-50 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-300 to-pink-400 text-white rounded-t-lg cursor-pointer">
        <div className="flex items-center space-x-2">
          <FiMessageSquare size={20} />
          <span className="font-semibold">Chatbot</span>
        </div>
        <button onClick={toggleChat} aria-label="Close Chat">
          <FiX size={20} className="hover:text-pink-100" />{" "}
        </button>
      </div>

      {/* Message List Area */}
      <div className="flex-grow p-4 overflow-y-auto bg-white space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-start max-w-[80%]">
              {/* Avatar cho bot */}
              {msg.sender === "bot" && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#EC80B1] text-white flex items-center justify-center mr-2">
                  <FiMessageSquare size={16} />
                </div>
              )}

              {/* Bubble tin nhắn */}
              <div
                className={`px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-[#EC80B1] text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Message..."
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EC80B1] text-sm"
            autoComplete="off"
          />
          <button
            type="submit"
            className="p-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 disabled:opacity-50 flex-shrink-0"
            disabled={!inputValue.trim()}
            aria-label="Send Message"
          >
            <FiSend size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBotWidget;
