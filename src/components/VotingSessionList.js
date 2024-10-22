// src/components/VotingSessionList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"; // Adjust imports as needed
import { Badge } from "./ui/badge";

const VotingSessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [organizations, setOrganizations] = useState([]); // State for organizations

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionResponse = await axios.get("/api/voting-sessions/");
        const orgResponse = await axios.get("/api/organizations/"); // Fetch organizations
        setSessions(sessionResponse.data);
        setOrganizations(orgResponse.data); // Set organizations
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData();
  }, []);

  const getOrganizationName = (orgId) => {
    const org = organizations.find((organization) => organization.id === orgId);
    return org ? org.name : "N/A"; // Return organization name or "N/A" if not found
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Voting Sessions</h1>
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
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.id}</TableCell>
                <TableCell>{getOrganizationName(session.organization)}</TableCell> {/* Display organization name */}
                <TableCell>
                  <Link to={`/positions/${session.id}`}>{session.title}</Link>
                </TableCell>
                <TableCell>{session.description}</TableCell>
                <TableCell>{new Date(session.start_time).toLocaleString()}</TableCell>
                <TableCell>{new Date(session.end_time).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="outline">{session.status}</Badge>
                </TableCell>
                <TableCell className="flex space-x-2">
                  {/* Add any additional action buttons if needed */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default VotingSessionList;
