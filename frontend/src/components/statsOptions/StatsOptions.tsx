/** @format */

import axios from "axios";
import React, { useState } from "react";

const MLBOptions = ({ onOptionClick }: any) => (
  <div>
    <button onClick={() => onOptionClick("standings")}>Standings</button>
    <button onClick={() => onOptionClick("odds")}>Odds</button>
    <button onClick={() => onOptionClick("aiPicks")}>AI Picks</button>
  </div>
);

const PremierLeagueOptions = ({ onOptionClick }: any) => (
  <div>
    <button onClick={() => onOptionClick("standings")}>Standings</button>
    <button onClick={() => onOptionClick("odds")}>Odds</button>
    <button onClick={() => onOptionClick("aiPicks")}>AI Picks</button>
  </div>
);

const NBAOptions = ({ onOptionClick }: any) => (
  <div>
    <button onClick={() => onOptionClick("standings")}>Standings</button>
    <button onClick={() => onOptionClick("odds")}>Odds</button>
    <button onClick={() => onOptionClick("aiPicks")}>AI Picks</button>
  </div>
);

export default function StatsOptions(league: any) {
  const [data, setData] = useState(null);

  const fetchData = async (option: any) => {
    try {
      const response = await axios.get(`/baseball/${option}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOptionClick = (option: any) => {
    fetchData(option);
  };

  return (
    <div>
      {league === "mlb" && <MLBOptions onOptionClick={handleOptionClick} />}
      {league === "premierLeague" && (
        <PremierLeagueOptions onOptionClick={handleOptionClick} />
      )}
      {league === "nba" && <NBAOptions onOptionClick={handleOptionClick} />}
      {data && (
        <div className="data-display">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
