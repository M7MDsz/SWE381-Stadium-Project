import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { apiRequest } from '../services/api';

function MyReservations() {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadReservations = async () => {
    try {
      const data = await apiRequest('/reservations/mine', {}, user.token);
      setReservations(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) loadReservations();
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await apiRequest(`/reservations/${id}/cancel`, { method: 'PUT' }, user.token);
      setNotice('Reservation cancelled.');
      loadReservations();
    } catch (err) {
      setError(err.message);
    }
  };

  const getSlot = (reservation) => {
    if (!reservation.stadium || !reservation.stadium.slots) return null;
    return reservation.stadium.slots.find((slot) => slot._id === reservation.slot);
  };

  return (
    <div>
      <h2>My Reservations</h2>
      {notice && <div className="alert alert-success">{notice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {reservations.map((reservation) => {
          const slot = getSlot(reservation);
          return (
            <div className="col-md-6" key={reservation._id}>
              <div className="card card-body shadow-sm">
                <h4>{reservation.stadium && reservation.stadium.name}</h4>
                <p className="text-muted">{reservation.stadium && reservation.stadium.location}</p>
                {slot && <p>{slot.date}: {slot.startTime} - {slot.endTime}</p>}
                <span className={`badge ${reservation.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>{reservation.status}</span>
                {reservation.status === 'active' && (
                  <button className="btn btn-danger mt-3" onClick={() => handleCancel(reservation._id)}>Cancel Reservation</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyReservations;
