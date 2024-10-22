// src/components/VotingSessionList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VotingSessionList = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get("/api/voting-sessions/")
      .then(response => setSessions(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Voting Sessions</h1>
      <ul>
        {sessions.map(session => (
          <li key={session.id} className="border-b p-2">
            <Link to={`/positions/${session.id}`}>{session.title}</Link> - {session.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotingSessionList;
