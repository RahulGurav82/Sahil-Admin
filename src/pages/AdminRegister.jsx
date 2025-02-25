import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiUserLine, RiLockPasswordLine } from "react-icons/ri";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://netjammer.onrender.com/admin/register", formData);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="grid grid-cols-1 gap-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 font-orbitron mb-2">
            ADMIN REGISTER
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto"></div>
        </div>

        {/* Register Form */}
        <div className="backdrop-blur-lg bg-black/30 p-8 rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/20 w-96">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <RiUserLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full py-3 px-10 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="relative">
              <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full py-3 px-10 bg-black/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}
            {success && <div className="text-green-500 text-center">{success}</div>}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
