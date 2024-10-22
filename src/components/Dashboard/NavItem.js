// src/components/NavItem.js
import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon, text, isOpen }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 p-2 rounded-lg transition-colors ${
        isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`
    }
  >
    <span className="text-xl">{icon}</span>
    {isOpen && <span className="text-base font-medium">{text}</span>}
  </NavLink>
);

export default NavItem;
