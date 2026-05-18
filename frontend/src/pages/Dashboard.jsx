import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SlotBadge from '../components/SlotBadge.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import { apiRequest } from '../services/api';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stadiums, setStadiums] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOwnerStadiums = async () => {
      if (user && user.role === 'owner') {
        try {
          const data = await apiRequest('/stadiums/mine', {}, user.token);
          setStadiums(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };
    loadOwnerStadiums();
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="alert alert-success">Welcome {user.name}. You are signed in as {user.role === 'owner' ? 'Stadium Owner' : 'Match Organizer'}.</div>
      {error && <div className="alert alert-danger">{error}</div>}
      {user.role === 'user' && (
        <div className="card card-body shadow-sm">
          <h4>Organizer Actions</h4>
          <Link className="btn btn-success mb-2" to="/search">Search and Reserve Stadium</Link>
          <Link className="btn btn-outline-success" to="/reservations">View My Reservations</Link>
        </div>
      )}
      {user.role === 'owner' && (
        <div>
          <Link className="btn btn-success mb-3" to="/add-stadium">Add New Stadium</Link>
          <div className="row g-3">
            {stadiums.map((stadium) => (
              <div className="col-md-6" key={stadium._id}>
                <div className="card card-body shadow-sm">
                  <h4>{stadium.name}</h4>
                  <p className="text-muted">{stadium.location}</p>
                  <div className="slot-grid small-grid">
                    {stadium.slots.map((slot) => <SlotBadge key={slot._id} slot={slot} />)}
                  </div>
                  <Link className="btn btn-outline-success mt-3" to={`/add-stadium?stadium=${stadium._id}`}>Add Reservation Slot</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
