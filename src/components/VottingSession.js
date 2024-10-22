import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Clock, Check, Trash2, Plus, Download, Upload } from 'lucide-react';
import VotingSessionForm from '../components/VotingSessionForm';
import apiService from '../services/apiService';

const VotingSession = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [votingData, setVotingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const votingStats = [
    { icon: <Plus className="h-6 w-6 text-blue-500" />, label: 'Total Votes', count: 3947 },
    { icon: <Clock className="h-6 w-6 text-yellow-500" />, label: 'Pending Votes', count: 624 },
    { icon: <Check className="h-6 w-6 text-green-500" />, label: 'Counted Votes', count: 3195 },
    { icon: <Trash2 className="h-6 w-6 text-red-500" />, label: 'Discarded Votes', count: 128 },
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const sessions = await apiService.fetchVotingSessions();
        console.log("Fetched Sessions:", sessions);
        setVotingData(sessions);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };    
    loadData();
  }, []);

  const handleAddVotingSession = async (sessionData) => {
    try {
      const newSession = {
        organization: {
          id: sessionData.organization_id, // Directly assign organization ID if needed
          name: sessionData.organization_name // You might need to pass the name too
        },
        title: sessionData.title,
        description: sessionData.description,
        start_time: sessionData.start_time,
        end_time: sessionData.end_time,
        status: sessionData.status,
      };

      const response = await apiService.createVotingSession(newSession);
      setVotingData(prevData => [...prevData, response]); // Assuming response returns the created session
      setFormVisible(false);
    } catch (error) {
      console.error("Error adding voting session:", error);
    }
  };

  const handleDelete = async (sessionId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this voting session?");
    if (!isConfirmed) return;

    try {
      await apiService.deleteVotingSession(sessionId);
      setVotingData(prevData => prevData.filter(session => session.id !== sessionId));
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Voting Sessions</h1>

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
<Table className="min-w-full bg-white rounded-lg shadow-md">
  <TableHeader className="bg-gray-100">
    <TableRow>
      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">ID</TableHead>
      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Organization</TableHead>
      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Title</TableHead>
      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Description</TableHead>
      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Start Time</TableHead>
      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">End Time</TableHead>
      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Created Date</TableHead>
      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</TableHead>
      <TableHead className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {votingData.map((vote, index) => (
      <TableRow key={vote.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
        <TableCell className="py-2 px-4 border-b border-gray-200">{index + 1}</TableCell>
        <TableCell className="py-2 px-4 border-b border-gray-200">{vote.organization.name}</TableCell> {/* Access organization name directly */}
        <TableCell className="py-2 px-4 border-b border-gray-200">{vote.title}</TableCell>
        <TableCell className="py-2 px-4 border-b border-gray-200">{vote.description}</TableCell>
        <TableCell className="py-2 px-4 border-b border-gray-200">{new Date(vote.start_time).toLocaleString()}</TableCell>
        <TableCell className="py-2 px-4 border-b border-gray-200">{new Date(vote.end_time).toLocaleString()}</TableCell>
        <TableCell className="py-2 px-4 border-b border-gray-200">{new Date(vote.created_at).toLocaleString()}</TableCell>
        <TableCell className="py-2 px-4 border-b border-gray-200">
          <Badge variant="outline">{vote.status}</Badge>
        </TableCell>
        <TableCell className="flex space-x-2 py-2 px-4 border-b border-gray-200">
          <Button variant="outline" className="text-blue-500 hover:bg-blue-100">
            <Plus className="mr-1 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="text-red-500 hover:bg-red-100"
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
