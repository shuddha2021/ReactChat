import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from './actions';
import './App.css';

const socket = io('http://localhost:4001');

function App() {
  const [message, setMessage] = useState('');
  const messages = useSelector(state => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('Received message:', data);
      dispatch(addMessage(data));
    });
  }, [dispatch]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
      <div className="chat-container">
        <div className="online-users">
          <h3>Online Users</h3>
          <ul>
            <li>gaurav</li>
            <li>ayush</li>
            <li>divyansh</li>
            <li>harsh</li>
            <li>dinesh</li>
            <li>chirag</li>
          </ul>
        </div>
        <div className="chat-box">
          <div className="messages">
            {messages.map((msg, index) => (
                <div key={index} className="message">
                  <div className="message-content">
                    <span className="message-text">{msg.text}</span>
                    <span className="message-timestamp">{msg.timestamp}</span>
                  </div>
                </div>
            ))}
          </div>
          <div className="input-box">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
  );
}

export default App;
