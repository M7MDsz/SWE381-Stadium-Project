import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Search from './pages/Search.jsx';
import StadiumDetails from './pages/StadiumDetails.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddStadium from './pages/AddStadium.jsx';
import MyReservations from './pages/MyReservations.jsx';
import Messages from './pages/Messages.jsx';
import OwnerStats from './pages/OwnerStats.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stadiums/:id" element={<StadiumDetails />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/add-stadium" element={<ProtectedRoute role="owner"><AddStadium /></ProtectedRoute>} />
          <Route path="/reservations" element={<ProtectedRoute><MyReservations /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute role="owner"><OwnerStats /></ProtectedRoute>} />
          <Route path="/not-allowed" element={<div className="alert alert-danger">You are not allowed to open this page.</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
