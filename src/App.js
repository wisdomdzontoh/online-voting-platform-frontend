// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import OrganizationList from "./components/OrganizationList";
import VotingSessionList from "./components/VotingSessionList";
import PositionManagement from "./components/PositionManagement";
import VoterList from "./components/VoterList";
import Sidebar from "./components/Dashboard/Sidebar";
import Header from "./components/Dashboard/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import apiService from "./services/apiService";
import Navbar from "./components/Dashboard/NavBar";
import VottingSession from "./components/VottingSession";
import OrganizationPage from "./components/OrganizatonPage";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  // Check token on load and set authenticated state
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      apiService.setAuthToken(token);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false after checking token
  }, []);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // If still loading, return a loading indicator or nothing
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <div className="flex">
              {/* Sidebar */}
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

              {/* Main Content */}
              <main
                className={`flex-1 p-5 transition-all duration-300 ${
                  isSidebarOpen ? "ml-54" : "ml-16"
                }`}
              >
                <Navbar toggleDarkMode={() => setDarkMode((prev) => !prev)} />

                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/organizations" element={<OrganizationPage />} />
                  <Route path="/voting-sessions" element={<VottingSession />} />
                  <Route path="/positions/:sessionId" element={<PositionManagement />} />
                  <Route path="/voters/:sessionId" element={<VoterList />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
