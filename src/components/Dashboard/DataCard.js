// src/components/Dashboard/VotingDataCard.js
import React from "react";

const VotingDataCard = ({ title, count, icon }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
      {icon} {title}
    </h2>
    <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">{count}</p>
  </div>
  
  
);

export default VotingDataCard;
