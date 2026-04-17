import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function ChatApp({ setPage }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username] = useState('Lifter' + Math.floor(Math.random() * 1000));

  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Socket listeners
  useEffect(() => {
    socket.emit('joinRoom', 'general');

    const handleReceiveMessage = (msg) => {
      setMessages(prev => [...prev, msg]);
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    const messageData = {
      room: 'general',
      user: username,
      text: messageInput.trim()
    };

    // Send to server ONLY — do NOT add to state here
    socket.emit('sendMessage', messageData);

    // Clear input
    setMessageInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#eee',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '1px solid #333'
      }}>
        <h1 style={{ fontSize: '2.8rem' }}>💬 Community Chat</h1>
        <button
          onClick={() => setPage('landing')}
          style={{
            padding: '10px 20px',
            background: 'none',
            border: '1px solid #666',
            color: '#ccc',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Chat Box */}
      <div style={{
        flex: 1,
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
        backgroundColor: '#1a1a1a',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Messages Area */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.user === username ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                backgroundColor: msg.user === username ? '#ff4d4d' : '#333',
                padding: '12px 16px',
                borderRadius: '12px',
                color: msg.user === username ? '#fff' : '#eee'
              }}
            >
              <strong>{msg.user}</strong>
              <p style={{ margin: '6px 0 2px 0' }}>{msg.text}</p>
              <small style={{ opacity: 0.7, fontSize: '0.8rem' }}>
                {new Date(msg.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </small>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '15px',
          backgroundColor: '#222',
          borderTop: '1px solid #444',
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message to the community..."
            style={{
              flex: 1,
              padding: '14px',
              fontSize: '1.1rem',
              backgroundColor: '#2a2a2a',
              border: 'none',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: '14px 32px',
              backgroundColor: '#4d79ff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '12px', color: '#666' }}>
        You are chatting as: <strong>{username}</strong>
      </div>
    </div>
  );
}