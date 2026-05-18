import React, { useEffect, useState } from 'react';
import StadiumCard from '../components/StadiumCard.jsx';
import { apiRequest } from '../services/api';

function Search() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [stadiums, setStadiums] = useState([]);
  const [error, setError] = useState('');

  const loadStadiums = async (query = '') => {
    try {
      const data = await apiRequest(`/stadiums${query}`);
      setStadiums(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadStadiums();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (date) params.append('date', date);
    if (time) params.append('time', time);
    loadStadiums(`?${params.toString()}`);
  };

  return (
    <div>
      <h2>Search Stadiums</h2>
      <form onSubmit={handleSubmit} className="card card-body mb-4 shadow-sm">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Location</label>
            <input className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or area" />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Date</label>
            <input className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Start Time</label>
            <input className="form-control" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-success" type="submit">Search</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {stadiums.map((stadium) => (
          <div className="col-md-4" key={stadium._id}>
            <StadiumCard stadium={stadium} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
