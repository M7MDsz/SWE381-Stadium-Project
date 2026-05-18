import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { apiRequest } from '../services/api';

function OwnerStats() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await apiRequest('/stadiums/stats', {}, user.token);
        setStats(data);
      } catch (err) {
        setError(err.message);
      }
    };
    if (user) loadStats();
  }, [user]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!stats) return <div className="alert alert-info">Loading statistics...</div>;

  return (
    <div>
      <h2>Reservation Statistics</h2>
      <div className="row g-3">
        {Object.entries(stats).map(([label, value]) => (
          <div className="col-md-4" key={label}>
            <div className="card card-body text-center shadow-sm stat-card">
              <h3>{value}</h3>
              <p className="text-capitalize mb-0">{label.replace(/([A-Z])/g, ' $1')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerStats;
