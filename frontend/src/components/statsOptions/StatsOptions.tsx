/** @format */

import axios from "axios";
import React, { useState } from "react";
import "./statsOptions.css"

interface StatsOptionsProps {
  league: string;
  sport: string;
  onDataFetch: (data: any[], headers: string[]) => void;
}


export default function StatsOptions(props: StatsOptionsProps) {
  const {league, sport, onDataFetch} = props;

  const url = "http://localhost:8000"

  const fetchData = async (option: any) => {
    try {
      const response = await axios.get(`${url}/${sport}/${option}`);
      const data = response.data
      console.log("data: ", data)
      const standingsArray = data[league].children.map((child: any) => ({
        league: child.name,
        entries: child.standings.entries.map((entry: any) => ({
          team: entry.team.displayName,
          stats: entry.stats.reduce((acc: any, stat: any) => {
            acc[stat.shortDisplayName] = stat.value;
            return acc;
          }, {})
        })),
      }));

      const headerSet = new Set<string>();
      standingsArray.forEach((league: any) =>
      league.entries.forEach((entry: any)=>
      Object.keys(entry.stats).forEach((header:string) => headerSet.add(header))))
      const headers = Array.from(headerSet)

      console.log(standingsArray)
      console.log("Headers:", headers);

      onDataFetch(standingsArray, headers )
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
