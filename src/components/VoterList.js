// src/components/VoterList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VoterList = () => {
  const { sessionId } = useParams();
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    axios.get(`/api/voters/?voting_session=${sessionId}`)
      .then(response => setVoters(response.data))
      .catch(error => console.error(error));
  }, [sessionId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Voters</h1>
      <ul>
        {voters.map(voter => (
          <li key={voter.id} className="border-b p-2">
            {voter.passcode} - {voter.has_voted ? "Voted" : "Not Voted"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoterList;
