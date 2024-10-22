// src/components/OrganizationList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
import OrganizationForm from "./OrganizationForm";

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to enhance UX
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false); // Ensure dark mode state exists

  // Fetch organization data and handle potential errors
  const fetchOrganizations = async () => {
    try {
      const response = await apiService.get("/api/organizations/");
      setOrganizations(response.data);
    } catch (error) {
      console.error("Failed to fetch organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className={`flex min-h-screen p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <main className="w-full max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Organizations</h1>
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading organizations...</p>
          ) : organizations.length > 0 ? (
            <ul className="space-y-4">
              {organizations.map((org) => (
                <li
                  key={org.id}
                  className="p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{org.name}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{org.email}</p>
                    </div>
                    <button
                      className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300"
                      onClick={() => navigate(`/organizations/${org.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No organizations found.</p>
          )}
        </header>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Add New Organization</h2>
          <OrganizationForm />
        </section>
      </main>
    </div>
  );
};

export default OrganizationList;
