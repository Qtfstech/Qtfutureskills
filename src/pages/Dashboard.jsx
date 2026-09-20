import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo-full.jpeg';
import MyTicket from '../components/sections/MyTicket';
import AdminDashboard from '../components/sections/AdminDashboard';
import './Dashboard.css';

export default function Dashboard({ session, setSession }) {
  const navigate = useNavigate();

  if (!session) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    setSession(null);
    navigate('/');
  };

  if (session.role === 'admin') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="dash">
      <header className="dash__topbar">
        <Link to="/" className="dash__brand">
          <img src={logo} alt="Quality Thought Future Skills Foundation" className="dash__brand-logo" />
        </Link>
        <div className="dash__topbar-right">
          <Link to="/" className="dash__home-link">Back to site</Link>
          <button type="button" className="btn btn-outline-dark dash__logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="dash__main">
        <MyTicket registration={session.registration} />
      </main>
    </div>
  );
}
