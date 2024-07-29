/** @format */

import axios from "axios";
import React, { useState } from "react";
import "./statsOptions.css"

interface StatsOptionsProps {
  league: string;
  sport: string;
  onDataFetch: (data: any) => void;
}


export default function StatsOptions(props: StatsOptionsProps) {
  const {league, sport, onDataFetch} = props;

  const url = "http://localhost:8000"

  const fetchData = async (option: any) => {
    try {
      const response = await axios.get(`${url}/${sport}/${option}`);
      const data = response.data
      console.log("data: ", data)

      onDataFetch(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOptionClick = (option: any) => {
    fetchData(option);
  };

  return (
    <div className="container-btn justify-between flex  border-primary-500 bg-transparent  p-4">
    {league === "mlb" && (
      <div className="flex gap-2">
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("standings")}>Standings</button>
        <button  className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("odds")}>Odds</button>
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("aiPicks")}>AI Picks</button>
      </div>
    )}
    {league === "eng.1" && (
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
    {league === "wnba" && (
      <div className="flex gap-2">
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("standings")}>Standings</button>
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md"onClick={() => handleOptionClick("odds")}>Odds</button>
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("aiPicks")}>AI Picks</button>
      </div>
    )}
    {league === "college-baseball" && (
      <div className="flex gap-2">
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("standings")}>Standings</button>
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md"onClick={() => handleOptionClick("odds")}>Odds</button>
        <button className="bg-secondary-200 text-white py-2 px-3 rounded-md" onClick={() => handleOptionClick("aiPicks")}>AI Picks</button>
      </div>
    )}
  </div>
);
};
