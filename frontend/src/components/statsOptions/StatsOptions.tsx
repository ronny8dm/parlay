/** @format */

import axios from "axios";
import React, { useState } from "react";
import "./statsOptions.css"

interface StatsOptionsProps {
  league: string;
  onDataFetch: (data: any) => void;
}


export default function StatsOptions(props: StatsOptionsProps) {
  const {league, onDataFetch} = props;

  const fetchData = async (option: any) => {
    try {
      const response = await axios.get(`/baseball/${option}`);
      onDataFetch(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOptionClick = (option: any) => {
    fetchData(option);
  };

  return (
    <div className="container-btn justify-center justify-between flex  border-primary-500 bg-transparent  p-4">
    {league === "mlb" && (
      <div className="flex gap-2">
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("standings")}>Standings</button>
        <button  className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("odds")}>Odds</button>
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("aiPicks")}>AI Picks</button>
      </div>
    )}
    {league === "premierLeague" && (
      <div className="flex gap-2">
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("standings")}>Table</button>
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("odds")}>Odds</button>
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("aiPicks")}>AI Picks</button>
      </div>
    )}
    {league === "nba" && (
      <div className="flex gap-2">
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("standings")}>Standings</button>
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md"onClick={() => handleOptionClick("odds")}>Odds</button>
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("aiPicks")}>AI Picks</button>
      </div>
    )}
  </div>
);
};
