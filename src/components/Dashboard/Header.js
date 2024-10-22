// src/components/Dashboard/VotingHeader.js
import React, { useState } from "react";
import { FiUser, FiLogOut } from "react-icons/fi"; // Import user and logout icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import apiService from "../../services/apiService"; // Import your API service (optional, depending on your setup)

const VotingHeader = ({ toggleDarkMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const navigate = useNavigate(); // Hook for navigation

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    apiService.logout(); // Call the logout function from apiService
  };
  

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
        Voting Dashboard
      </h1>

      <div className="relative">
        <button
          onClick={handleToggleDropdown}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
        >
          <FiUser />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
            <ul className="py-2">
              <li className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                View Profile
              </li>
              <li
                className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={handleLogout}
              >
                <FiLogOut className="inline mr-2" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={toggleDarkMode}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
      >
        Toggle Dark Mode
      </button>
    </header>
  );
};

export default VotingHeader;
