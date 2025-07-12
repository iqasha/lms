// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition duration-200"
      title="Logout"
    >
      <FaSignOutAlt size={20} />
      <span>Log Out</span>
    </button>
  );
};

export default LogoutButton;
