/** @format */

import React, { useEffect, useState } from "react";
import "./statsOptions.css";
import ClientAPI from "../../services/ClientAPI";

interface StatsOptionsProps {
  seasonId: number;
  onDataFetch: (data: any) => void;
  onAIPicksFetch: (aiPickData: any) => void;
  clearData: () => void;
  setIsAIPicks: (isAIPicks: boolean) => void;
}

const api = ClientAPI();

export default function StatsOptions(props: StatsOptionsProps) {
  const { seasonId, onDataFetch, onAIPicksFetch, clearData, setIsAIPicks } =
    props;
  const [data, setData] = useState(false);

  const handleOptionClick = async (option: string) => {
    if (option === "standings") {
      try {
        const standings = await api.getStandings(seasonId);
        if (standings && standings.data && standings.data.length > 0) {
          onDataFetch(standings);
          setIsAIPicks(false);
          setData(true);
        } else {
          clearData();
          setData(false);
        }
      } catch (error) {
        console.error("Error fetching standings:", error);
        clearData();
        setData(false);
      }
    } else if (option == "aiPicks") {
      const sampleAIPicks = [{}];
      onAIPicksFetch(sampleAIPicks);
    }
  };

  useEffect(() => {
    handleOptionClick("standings");
  }, [seasonId]);

  return (
    <div className="container-btn justify-between flex border-primary-500 bg-transparent p-4">
      <div className="flex gap-2">
        <button
          className="bg-secondary-200 order-1 text-white py-2 px-3 rounded-md"
          onClick={() => handleOptionClick("standings")}
        >
          Standings
        </button>
        <button
          className="bg-secondary-200 order-2 text-white py-2 px-3 rounded-md"
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
