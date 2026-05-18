import { useContext, useEffect, useState } from 'react';
import SlotBadge from '../components/SlotBadge.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { apiRequest } from '../services/api';

function StadiumDetails() {
  const id = window.location.pathname.split('/').pop();
  const { user } = useContext(AuthContext);
  const [stadium, setStadium] = useState(null);
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const loadStadium = async () => {
    try {
      const data = await apiRequest(`/stadiums/${id}`);
      setStadium(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadStadium();
  }, []);

  const handleReserve = async (slotId) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    try {
      await apiRequest(`/stadiums/${id}/slots/${slotId}/reserve`, { method: 'POST' }, user.token);
      setNotice('Reservation completed successfully.');
      loadStadium();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/login';
      return;
    }

    try {
      await apiRequest(`/stadiums/${id}/messages`, {
        method: 'POST',
        body: JSON.stringify({ text: message })
      }, user.token);
      setMessage('');
      setNotice('Message sent to the owner.');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!stadium) return <div className="alert alert-info">Loading stadium...</div>;

  return (
    <div>
      <h2>{stadium.name}</h2>
      {notice && <div className="alert alert-success">{notice}</div>}
      <p className="text-muted">{stadium.location}</p>
      <p>{stadium.description}</p>
      <p><strong>Owner:</strong> {stadium.owner && stadium.owner.name}</p>
      <p><strong>Facilities:</strong> {stadium.facilities && stadium.facilities.join(', ')}</p>
      <div className="row g-3 mb-4">
        {stadium.photos && stadium.photos.map((photo) => (
          <div className="col-md-4" key={photo}>
            <img src={photo} className="img-fluid rounded shadow-sm" alt="Stadium" />
          </div>
        ))}
      </div>
      <h4>Availability Schedule</h4>
      <div className="slot-grid mb-4">
        {stadium.slots.map((slot) => (
          <SlotBadge key={slot._id} slot={slot} onReserve={user && user.role === 'user' ? handleReserve : null} />
        ))}
      </div>
      <form onSubmit={handleMessage} className="card card-body shadow-sm">
        <h5>Send Message to Owner</h5>
        <textarea className="form-control mb-3" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <button className="btn btn-success" type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default StadiumDetails;
