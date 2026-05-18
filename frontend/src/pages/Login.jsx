import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Sign In</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="card card-body shadow-sm">
          <label className="form-label">Email</label>
          <input className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          <label className="form-label">Password</label>
          <input className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          <button className="btn btn-success" type="submit">Login</button>
          <p className="mt-3 mb-0">No account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
