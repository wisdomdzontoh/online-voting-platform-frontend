// src/components/PositionManagement.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PositionManagement = () => {
  const { sessionId } = useParams();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios.get(`/api/positions/?voting_session=${sessionId}`)
      .then(response => setPositions(response.data))
      .catch(error => console.error(error));
  }, [sessionId]);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Positions</h1>
      <ul>
        {positions.map(pos => (
          <li key={pos.id} className="border-b p-2">{pos.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PositionManagement;
