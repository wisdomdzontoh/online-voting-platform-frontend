// src/components/Sidebar.js
import React from "react";
import { FiHome, FiDatabase, FiUsers, FiFileText, FiSettings, FiMenu } from "react-icons/fi";
import NavItem from "./NavItem"; // We’ll create this next

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <aside
    className={`bg-white h-screen shadow-md transition-all duration-300 ${
      isOpen ? "w-64" : "w-20"
    }`}
  >
    <button
      className="text-gray-500 p-4 focus:outline-none"
      onClick={toggleSidebar}
    >
      <FiMenu size={24} />
    </button>

    <nav className="mt-8 space-y-4">
      <NavItem to="/" icon={<FiHome />} text="Dashboard" isOpen={isOpen} />
      <NavItem to="/organizations" icon={<FiDatabase />} text="Organizations" isOpen={isOpen} />
      <NavItem to="/voting-sessions" icon={<FiDatabase />} text="Voting Sessions" isOpen={isOpen} />
      <NavItem to="/users" icon={<FiUsers />} text="Users" isOpen={isOpen} />
      <NavItem to="/reports" icon={<FiFileText />} text="Reports" isOpen={isOpen} />
      <NavItem to="/settings" icon={<FiSettings />} text="Settings" isOpen={isOpen} />
    </nav>
  </aside>
);

export default Sidebar;
