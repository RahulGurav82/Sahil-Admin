import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Register from './pages/Register.jsx'; // Import the Register page
import AdminRegister from './pages/AdminRegister.jsx'; // Import the Register page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/register" element={<Register />} /> {/* Updated Register Route */}
        <Route path="/admin/register" element={<AdminRegister />} /> {/* Updated Register Route */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
