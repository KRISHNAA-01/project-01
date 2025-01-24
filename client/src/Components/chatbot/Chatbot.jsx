import React, { useState } from 'react';
import './Chatbot.css';
import api from '../context/axios'; // Ensure this is correctly set up

const Chatbot = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { fromUser: true, message: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await api.post('/chatbot/query', { userId, message: input });
      const botMessage = {
        fromUser: false,
        message: response.data.response || "I'm sorry, I couldn't process your request.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in chatbot response:', error);
      setMessages((prev) => [
        ...prev,
        { fromUser: false, message: 'please log in / sign up to use the feature of chatbot' },
      ]);
    }

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        💬 Chat
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Chatbot</h3>
            <button className="close-btn" onClick={toggleChatbot}>
              ✖
            </button>
          </div>
          <div className="chatbot-body">
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={msg.fromUser ? 'user-message' : 'bot-message'}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
