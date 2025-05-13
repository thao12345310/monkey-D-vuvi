import React, { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";
import MarkdownIt from "markdown-it";

const ChatBotWidget = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there 👋\nHow can I help you today?", sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true, // giữ xuống dòng \n chuẩn Markdown
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (trimmedInput) {
      const newMessage = { id: messages.length + 1, text: trimmedInput, sender: "user" };
      setMessages((prev) => [...prev, newMessage]);
      setInputValue("");

      try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmedInput, user_id: "user_123" }),
        });

        const data = await response.json();
        const botResponse = { id: messages.length + 2, text: data.reply, sender: "bot" };
        setMessages((prev) => [...prev, botResponse]);
      } catch (error) {
        console.error("Error sending message:", error);
        const botResponse = { id: messages.length + 2, text: "Error: Unable to get response from server.", sender: "bot" };
        setMessages((prev) => [...prev, botResponse]);
      }
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

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

  return (
    <div className="fixed bottom-5 right-5 w-80 md:w-96 h-[500px] flex flex-col bg-white rounded-lg shadow-xl z-50 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-300 to-pink-400 text-white rounded-t-lg cursor-pointer">
        <div className="flex items-center space-x-2">
          <FiMessageSquare size={20} />
          <span className="font-semibold">Chatbot</span>
        </div>
        <button onClick={toggleChat} aria-label="Close Chat">
          <FiX size={20} className="hover:text-pink-100" />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-grow p-4 overflow-y-auto bg-white space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-start max-w-[80%]">
              {msg.sender === "bot" && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#EC80B1] text-white flex items-center justify-center mr-2">
                  <FiMessageSquare size={16} />
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-lg text-sm ${msg.sender === "user"
                  ? "bg-[#EC80B1] text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
              >
                {msg.sender === "bot" ? (
                  <div
                    className="prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_a]:text-pink-500 [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: md.render(msg.text) }}
                  />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
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
