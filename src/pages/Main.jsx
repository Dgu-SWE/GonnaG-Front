import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './Main.css';

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 채팅 히스토리 불러오기
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('http://localhost:3003/history');
        const json = await res.json();
        const historyData = json.data.history;
        const formattedMessages = historyData.map((msg) => ({
          id: msg.messageId,
          type: msg.role === 'USER' ? 'user' : 'ai',
          text: msg.content,
        }));
        setMessages(formattedMessages);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      }
    };
    fetchHistory();
  }, []);

  // 백엔드로 메시지 전송
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');
    setIsLoading(true);

    // 사용자 메시지를 먼저 추가
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      text: userMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      // 백엔드 API 호출
      // TODO: 실제 백엔드 API 엔드포인트로 교체하세요
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: data.response || data.message || '응답을 받았습니다.',
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <Sidebar />
      <section className="page-content chat-container">
        <header className="chat-header">
          <h1 className="chat-title">채팅</h1>
        </header>

        <div className="chat-messages" ref={chatContainerRef}>
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <h2 className="chat-welcome-title">졸업까지 얼마나 남았을까요?</h2>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.type === 'user' ? 'chat-message--user' : 'chat-message--ai'}`}
              >
                <div className="chat-message__bubble">
                  <p className="chat-message__text">{message.text}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="chat-message chat-message--ai">
              <div className="chat-message__bubble">
                <div className="chat-loading">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={sendMessage}>
          <input
            type="text"
            className="chat-input"
            placeholder="무엇이든 물어보세요"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="chat-send-button"
            disabled={!inputText.trim() || isLoading}
            aria-label="전송"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </section>
    </div>
  );
};

export default Main;
