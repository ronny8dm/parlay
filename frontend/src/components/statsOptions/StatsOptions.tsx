/** @format */

import axios from "axios";
import React, { useState } from "react";
import "./statsOptions.css"

interface StatsOptionsProps {
  league: string;
}


export default function StatsOptions(props: StatsOptionsProps) {
  const {league} = props;
  const [data, setData] = useState(null);

  const fetchData = async (option: any) => {
    try {
      const response = await axios.get(`/baseball/${option}`);
      
      setData(response.data);

      const responseData = response.data
      console.log("fetching data: ", responseData)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOptionClick = (option: any) => {
    fetchData(option);
  };

    console.log(league)
  return (
    <div className="container-btn justify-center justify-between flex solid border-primary-500 bg-transparent rounded-md p-4">
    {league === "mlb" && (
      <div className="flex gap-2">
        <button className="bg-secondary-200 text-white p-2 rounded-md" onClick={() => handleOptionClick("standings")}>Standings</button>
        <button  className="bg-secondary-200 text-white p-2 rounded-md" onClick={() => handleOptionClick("odds")}>Odds</button>
        <button className="bg-secondary-200 text-white p-2 rounded-md" onClick={() => handleOptionClick("aiPicks")}>AI Picks</button>
      </div>
    )}
    {league === "premierLeague" && (
      <div className="flex gap-2">
        <button className="bg-secondary-200 text-white p-2 rounded-md" onClick={() => handleOptionClick("standings")}>Table</button>
        <button className="bg-secondary-200 text-white p-2 rounded-md" onClick={() => handleOptionClick("odds")}>Odds</button>
        <button className="bg-secondary-200 text-white p-2 rounded-md" onClick={() => handleOptionClick("aiPicks")}>AI Picks</button>
      </div>
    )}
    {league === "nba" && (
      <div className="flex gap-2">
        <button className="bg-secondary-200 text-white p-2 rounded-md" onClick={() => handleOptionClick("standings")}>Standings</button>
        <button className="bg-secondary-200 text-white p-2 rounded-md"onClick={() => handleOptionClick("odds")}>Odds</button>
        <button className="bg-secondary-200 text-white p-2 rounded-md" onClick={() => handleOptionClick("aiPicks")}>AI Picks</button>
      </div>
    )}
    {data && (
      <div className="data-display">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )}
  </div>
);
};
