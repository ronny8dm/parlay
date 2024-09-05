/** @format */

import React, { useEffect, useRef, useState } from "react";
import LeagueTabs from "../leagueTabs/LeagueTabs";
import StatsOptions from "../statsOptions/StatsOptions";
import StandingsBoard from "../standingsBoard/StandingsBoard";
import PredictionsBoard from "../predictionsBoard/PredictionsBoard";

interface LeagueSport {
  league: string;
  sport: string;
}

export default function Board() {
  const [leagueSport, setLeagueSport] = useState<LeagueSport>({
    league: "mlb",
    sport: "baseball",
  });
  const [data, setData] = useState<any>([]);
  const [seasonId, setSeasonId] = useState<number | undefined>(undefined);
  const [fixtureId, setFixtureId] = useState<number | null>(null);
  const [aiPicks, setAiPicks] = useState<any>(null);
  const [isAIPicks, setIsAIPicks] = useState<boolean>(false);
  const [upcomingFixtures, setUpcomingFixtures] = useState<any[]>([]);

  const handleLeagueChange = (
    newLeagueSport: LeagueSport,
    newSeasonId: number,
    newFixtureId: number | null,
    upcomingFixtures: any[]
  ) => {
    setLeagueSport(newLeagueSport);
    setSeasonId(newSeasonId);
    setFixtureId(newFixtureId);
    setUpcomingFixtures(upcomingFixtures);
    handleOptionClick("standings");
  };

  const handleDataFetch = (fetchedData: any) => {
    console.log("Data fetched: ", fetchedData);
    setData(fetchedData);
    setAiPicks(false);
  };

  const handleAIPicksFetch = (fetchedAIPicks: any) => {
    console.log("AI Picks fetched: ", fetchedAIPicks);
    setAiPicks(fetchedAIPicks);
    setIsAIPicks(true);
  };

  const clearData = () => {
    setData([]);
  };

  const handleOptionClick = async (option: string) => {
    if (option === "standings" && seasonId) {
      console.log("Fetching standings for season: ", seasonId);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <LeagueTabs
        handleOptionClick={handleOptionClick}
        onLeagueChange={handleLeagueChange}
      />
      {seasonId && (
        <StatsOptions
          clearData={clearData}
          seasonId={seasonId}
          onDataFetch={handleDataFetch}
          onAIPicksFetch={handleAIPicksFetch}
          setIsAIPicks={setIsAIPicks}
        />
      )}

      {isAIPicks ? (
        <PredictionsBoard
          upcomingFixtures={upcomingFixtures}
          fixtureId={fixtureId}
          standingsData={data}
        />
      ) : Object.keys(data).length > 0 ? (
        <StandingsBoard data={data} selectedLeague={leagueSport.league} />
      ) : (
        <div className="mt-4 text-center text-red-500">
          No standings available.
        </div>
      )}
    </div>
  );
}
