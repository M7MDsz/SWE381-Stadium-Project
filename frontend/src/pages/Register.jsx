import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function Register() {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        <h2>Create Account</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="card card-body shadow-sm">
          <label className="form-label">Name</label>
          <input className="form-control mb-3" name="name" value={formData.name} onChange={handleChange} required />
          <label className="form-label">Email</label>
          <input className="form-control mb-3" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <label className="form-label">Password</label>
          <input className="form-control mb-3" name="password" type="password" value={formData.password} onChange={handleChange} required />
          <label className="form-label">Account Type</label>
          <select className="form-select mb-3" name="role" value={formData.role} onChange={handleChange}>
            <option value="user">Match Organizer</option>
            <option value="owner">Stadium Owner</option>
          </select>
          <button className="btn btn-success" type="submit">Register</button>
          <p className="mt-3 mb-0">Already registered? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
