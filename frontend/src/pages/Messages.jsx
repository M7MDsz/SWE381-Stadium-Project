import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { apiRequest } from '../services/api';

function Messages() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ receiver: '', text: '' });
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const loadMessages = async () => {
    try {
      const data = await apiRequest('/messages', {}, user.token);
      setMessages(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) loadMessages();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/messages', { method: 'POST', body: JSON.stringify(formData) }, user.token);
      setFormData({ receiver: '', text: '' });
      setNotice('Message sent.');
      loadMessages();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      {notice && <div className="alert alert-success">{notice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="card card-body shadow-sm mb-4">
        <h4>Send Direct Message</h4>
        <label className="form-label">Receiver User ID</label>
        <input className="form-control mb-3" name="receiver" value={formData.receiver} onChange={handleChange} required />
        <label className="form-label">Message</label>
        <textarea className="form-control mb-3" name="text" value={formData.text} onChange={handleChange} required />
        <button className="btn btn-success" type="submit">Send</button>
      </form>
      {messages.map((message) => (
        <div className="card card-body shadow-sm mb-3" key={message._id}>
          <div className="d-flex justify-content-between">
            <strong>{message.sender && message.sender.name} to {message.receiver && message.receiver.name}</strong>
            <span className="text-muted small">{new Date(message.createdAt).toLocaleString()}</span>
          </div>
          {message.stadium && <p className="mb-1 text-muted">About: {message.stadium.name}</p>}
          <p className="mb-0">{message.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Messages;
