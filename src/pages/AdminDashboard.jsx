import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleLine, RiUserLocationLine, RiTimeLine, RiUserLine, RiUserAddLine } from 'react-icons/ri';

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('https://netjammer.onrender.com/admin/logs', {  
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      }
    };

    fetchLogs();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleRegister = () => {
    navigate('/register');  // Navigate to the Register Page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Header */}
      <div className="relative z-10">
        <div className="p-6 flex justify-between items-center border-b border-purple-500/30 backdrop-blur-md bg-black/30">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 font-orbitron">
            NETWORK MONITOR
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={handleRegister}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
            >
              <RiUserAddLine className="mr-2" />
              Register
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              <RiLogoutCircleLine className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="backdrop-blur-lg bg-black/30 rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-900/50 to-pink-900/50">
                    <th className="py-4 px-6 text-left"><RiUserLine className="inline mr-2" />Email</th>
                    <th className="py-4 px-6 text-left"><RiTimeLine className="inline mr-2" />Login Time</th>
                    <th className="py-4 px-6 text-left"><RiUserLocationLine className="inline mr-2" />Latitude</th>
                    <th className="py-4 px-6 text-left"><RiUserLocationLine className="inline mr-2" />Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr 
                      key={log._id} 
                      className={`border-t border-purple-500/10 hover:bg-purple-500/10 transition-colors ${
                        index % 2 === 0 ? 'bg-black/20' : 'bg-black/10'
                      }`}
                    >
                      <td className="py-4 px-6">{log.email}</td>
                      <td className="py-4 px-6">{new Date(log.loginTime).toLocaleString()}</td>
                      <td className="py-4 px-6">{log.latitude}</td>
                      <td className="py-4 px-6">{log.longitude}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
    </div>
  );
};

export default AdminDashboard;
