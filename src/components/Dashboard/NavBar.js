// src/components/Navbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure correct import
import { 
  FaBars, FaSun, FaMoon, FaBell, FaUserCircle, FaRedo 
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { FiUser, FiLogOut } from "react-icons/fi"; // User and logout icons

const Navbar = ({ toggleSidebar, isDarkMode, toggleDarkMode, apiService = {} }) => {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility state
  const navigate = useNavigate(); // Navigation hook

  const handleToggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    apiService.logout && apiService.logout(); // Call logout from apiService
    navigate("/login"); // Redirect after logout
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md dark:bg-gray-800">
      {/* Left Section: Sidebar Toggle and Search */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar}>
          <FaBars className="text-xl text-gray-700 dark:text-white" />
        </button>
        <div className="relative">
          <MdSearch className="absolute left-2 top-2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="pl-8 pr-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Right Section: Icons and User Dropdown */}
      <div className="flex items-center gap-6">
        <button onClick={toggleDarkMode}>
          {isDarkMode ? (
            <FaSun className="text-xl text-yellow-500" />
          ) : (
            <FaMoon className="text-xl text-gray-500" />
          )}
        </button>
        <FaRedo className="text-xl text-gray-500 dark:text-white" />
        <FaBell className="text-xl text-gray-500 dark:text-white" />
        
        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={handleToggleDropdown}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            <FiUser />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li
                  className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => navigate("/profile")}
                >
                  View Profile
                </li>
                <li
                  className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={handleLogout}
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
