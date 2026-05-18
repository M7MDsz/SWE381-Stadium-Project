import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="alert alert-info">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/not-allowed" />;
  }

  return children;
}

export default ProtectedRoute;
