import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Clock, Check, Trash2, Plus, Download, Upload } from 'lucide-react';
import VotingSessionForm from '../components/VotingSessionForm';
import Modal from './Modal';
import apiService from '../services/apiService'; // Import API service

const VotingSession = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [votingData, setVotingData] = useState([]);
  const [organizations, setOrganizations] = useState([]); // State for organizations
  const [loading, setLoading] = useState(true); // Loading state

  const votingStats = [
    { icon: <Plus className="h-6 w-6 text-blue-500" />, label: 'Total Votes', count: 3947 },
    { icon: <Clock className="h-6 w-6 text-yellow-500" />, label: 'Pending Votes', count: 624 },
    { icon: <Check className="h-6 w-6 text-green-500" />, label: 'Counted Votes', count: 3195 },
    { icon: <Trash2 className="h-6 w-6 text-red-500" />, label: 'Discarded Votes', count: 128 },
  ];

  // Fetch voting sessions and organizations on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const sessions = await apiService.fetchVotingSessions();
        const orgs = await apiService.fetchOrganizations(); // Fetch organizations
        setOrganizations(orgs); // Set fetched organizations
        setVotingData(sessions); // Set fetched sessions
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };
    loadData();
  }, []);

  const handleAddVotingSession = (sessionData) => {
    const newSession = {
      id: `${Math.floor(Math.random() * 10000)}`, // Use a unique ID generation method in production
      organization: organizations.find(org => org.id === sessionData.organization), // Find organization object
      title: sessionData.title,
      description: sessionData.description,
      startTime: new Date(sessionData.start_time).toLocaleString(),
      endTime: new Date(sessionData.end_time).toLocaleString(),
      createdDate: new Date().toLocaleDateString(),
      status: sessionData.status, // Include status in new session
    };

    setVotingData((prevData) => [...prevData, newSession]);
    setFormVisible(false);
  };

  const handleDelete = async (sessionId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this voting session?");
    if (!isConfirmed) return; // If the user cancels, do nothing.

    try {
      await apiService.deleteVotingSession(sessionId);
      setVotingData((prevData) => prevData.filter((session) => session.id !== sessionId));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Voting Session</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {votingStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 bg-gray-100 rounded-full p-2">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 flex justify-between items-center">
          <Button variant="outline" className="flex items-center" onClick={() => setFormVisible(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Voting Session
          </Button>

          <div>
            <Button variant="outline" className="mr-2">
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Status</TableHead> {/* Add Status column */}
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {votingData.map((vote) => (
                <TableRow key={vote.id}>
                  <TableCell>{vote.id}</TableCell>
                  <TableCell>{vote.organization ? vote.organization.name : 'N/A'}</TableCell> {/* Display organization name */}
                  <TableCell>{vote.title}</TableCell>
                  <TableCell>{vote.description}</TableCell>
                  <TableCell>{vote.startTime}</TableCell>
                  <TableCell>{vote.endTime}</TableCell>
                  <TableCell>{vote.createdDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{vote.status}</Badge> {/* Display status */}
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="outline">
                      <Plus className="mr-1 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-500"
                      onClick={() => handleDelete(vote.id)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <VotingSessionForm
        isOpen={isFormVisible}
        onClose={() => setFormVisible(false)}
        onSubmit={handleAddVotingSession}
      />
    </div>
  );
};

export default VotingSession;
