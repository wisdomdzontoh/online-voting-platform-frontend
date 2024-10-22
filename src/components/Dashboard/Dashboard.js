// src/components/Dashboard/VotingDashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import WelcomeSection from "./WelcomeSection"; 
import DataCard from "./DataCard";
import Table from "./Table";
import apiService from "../../services/apiService";
import useFetchData from "../../hooks/useFetchData";
import { FiDatabase, FiUsers } from "react-icons/fi";
import Charts from "./Charts";

const VotingDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const { data: organizations } = useFetchData(apiService.fetchOrganizations);
  const { data: votingSessions } = useFetchData(apiService.fetchVotingSessions);
  const { data: candidates } = useFetchData(apiService.fetchCandidates);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex`}>
      
      <main className="flex-1 p-6 md:p-8 transition-all duration-300">

        <WelcomeSection /> 

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          <DataCard
            title="Organizations"
            count={organizations?.length || 0}
            icon={<FiDatabase className="text-indigo-500" />}
          />
          <DataCard
            title="Voting Sessions"
            count={votingSessions?.length || 0}
            icon={<FiDatabase className="text-blue-500" />}
          />
          <DataCard
            title="Candidates"
            count={candidates?.length || 0}
            icon={<FiUsers className="text-green-500" />}
          />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Voting Sessions
          </h2>
          <Table
            data={votingSessions}
            columns={votingSessionColumns}
            title="Voting Sessions"
          />

          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-10 mb-4">
            Candidates
          </h2>
          <Table data={candidates} columns={candidateColumns} title="Candidates" />
        </section>
        
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Voting Trends
          </h2>
          <Charts/>
        </section>
      </main>
    </div>
  );
};

const votingSessionColumns = [
  { Header: "Title", accessor: "title" },
  { Header: "Start Time", accessor: "start_time" },
  { Header: "End Time", accessor: "end_time" },
  { Header: "Organization", accessor: "organization.name" },
];

const candidateColumns = [
  { Header: "Name", accessor: "name" },
  { Header: "Position", accessor: "position.name" },
  { Header: "Votes", accessor: "votes" },
];

export default VotingDashboard; 
