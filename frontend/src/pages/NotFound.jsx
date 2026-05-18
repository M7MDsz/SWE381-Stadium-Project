import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="alert alert-warning">
      <h3>Page not found</h3>
      <Link to="/">Go home</Link>
    </div>
  );
}

export default NotFound;
