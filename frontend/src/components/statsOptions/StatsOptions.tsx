/** @format */

import React from "react";
import "./statsOptions.css";
import ClientAPI from "../../services/ClientAPI";

interface StatsOptionsProps {
  seasonId: number;
  onDataFetch: (data: any) => void;
}

const api = ClientAPI();

export default function StatsOptions(props: StatsOptionsProps) {
  const { seasonId, onDataFetch } = props;

  const handleOptionClick = async (option: string) => {
    if (option === "standings") {
      try {
        const standings = await api.getStandings(seasonId);
        onDataFetch(standings);
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    } else {
    }
  };

  return (
    <div className="container-btn justify-between flex border-primary-500 bg-transparent p-4">
      <div className="flex gap-2">
        <button
          className="bg-secondary-200 text-white py-2 px-3 rounded-md"
          onClick={() => handleOptionClick("standings")}
        >
          Standings
        </button>
        <button
          className="bg-secondary-200 text-white py-2 px-3 rounded-md"
          onClick={() => handleOptionClick("odds")}
        >
          Odds
        </button>
        <button
          className="bg-secondary-200 text-white py-2 px-3 rounded-md"
          onClick={() => handleOptionClick("aiPicks")}
        >
          AI Picks
        </button>
      </div>
    </div>
  );
}
