import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { apiRequest } from '../services/api';

function AddStadium() {
  const { user } = useContext(AuthContext);
  const [stadiums, setStadiums] = useState([]);
  const [selectedStadium, setSelectedStadium] = useState('');
  const [stadiumForm, setStadiumForm] = useState({ name: '', description: '', location: '', photos: '', facilities: '' });
  const [slotForm, setSlotForm] = useState({ date: '', startTime: '', endTime: '' });
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);
  const todayValue = today.toISOString().slice(0, 10);
  const maxDateValue = maxDate.toISOString().slice(0, 10);

  const loadStadiums = async () => {
    try {
      const data = await apiRequest('/stadiums/mine', {}, user.token);
      setStadiums(data);
      const queryId = new URLSearchParams(window.location.search).get('stadium');
      if (queryId) setSelectedStadium(queryId);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) loadStadiums();
  }, [user]);

  const handleStadiumChange = (e) => {
    setStadiumForm({ ...stadiumForm, [e.target.name]: e.target.value });
  };

  const handleSlotChange = (e) => {
    setSlotForm({ ...slotForm, [e.target.name]: e.target.value });
  };

  const handleCreateStadium = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    try {
      await apiRequest('/stadiums', { method: 'POST', body: JSON.stringify(stadiumForm) }, user.token);
      setStadiumForm({ name: '', description: '', location: '', photos: '', facilities: '' });
      setNotice('Stadium added successfully.');
      loadStadiums();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    try {
      await apiRequest(`/stadiums/${selectedStadium}/slots`, { method: 'POST', body: JSON.stringify(slotForm) }, user.token);
      setSlotForm({ date: '', startTime: '', endTime: '' });
      setNotice('Reservation slot added successfully.');
      loadStadiums();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Manage Stadiums</h2>
      {notice && <div className="alert alert-success">{notice}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-4">
        <div className="col-md-6">
          <form onSubmit={handleCreateStadium} className="card card-body shadow-sm">
            <h4>Add New Stadium</h4>
            <label className="form-label">Name</label>
            <input className="form-control mb-3" name="name" value={stadiumForm.name} onChange={handleStadiumChange} required />
            <label className="form-label">Description</label>
            <textarea className="form-control mb-3" name="description" value={stadiumForm.description} onChange={handleStadiumChange} required />
            <label className="form-label">Location</label>
            <input className="form-control mb-3" name="location" value={stadiumForm.location} onChange={handleStadiumChange} required />
            <label className="form-label">Photo URLs (comma separated)</label>
            <input className="form-control mb-3" name="photos" value={stadiumForm.photos} onChange={handleStadiumChange} />
            <label className="form-label">Facilities (comma separated)</label>
            <input className="form-control mb-3" name="facilities" value={stadiumForm.facilities} onChange={handleStadiumChange} />
            <button className="btn btn-success" type="submit">Save Stadium</button>
          </form>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleAddSlot} className="card card-body shadow-sm">
            <h4>Add Reservation Slot</h4>
            <label className="form-label">Stadium</label>
            <select className="form-select mb-3" value={selectedStadium} onChange={(e) => setSelectedStadium(e.target.value)} required>
              <option value="">Choose stadium</option>
              {stadiums.map((stadium) => <option value={stadium._id} key={stadium._id}>{stadium.name}</option>)}
            </select>
            <label className="form-label">Date</label>
            <input className="form-control mb-3" name="date" type="date" min={todayValue} max={maxDateValue} value={slotForm.date} onChange={handleSlotChange} required />
            <label className="form-label">Start Time</label>
            <input className="form-control mb-3" name="startTime" type="time" value={slotForm.startTime} onChange={handleSlotChange} required />
            <label className="form-label">End Time</label>
            <input className="form-control mb-3" name="endTime" type="time" value={slotForm.endTime} onChange={handleSlotChange} required />
            <button className="btn btn-success" type="submit">Add Slot</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStadium;
