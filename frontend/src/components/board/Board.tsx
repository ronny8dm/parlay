/** @format */

import React, { useState } from 'react';
import LeagueTabs from '../leagueTabs/LeagueTabs';
import StatsOptions from '../statsOptions/StatsOptions';
import StandingsBoard from '../standingsBoard/StandingsBoard';

interface LeagueSport {
  league: string;
  sport: string;
}

export default function Board() { 
  const [leagueSport, setLeagueSport] = useState<LeagueSport>({ league: "mlb", sport: "baseball" });
  const [data, setData] = useState<any>([]);
  

  const handleLeagueChange = (newLeagueSport: LeagueSport) => {
    setLeagueSport(newLeagueSport);
  };

  const handleDataFetch = (fetchedData: any) => {
    console.log("Data fetched: ", fetchedData)
    setData(fetchedData);
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <LeagueTabs onLeagueChange={handleLeagueChange} />
      <StatsOptions league={leagueSport.league} sport={leagueSport.sport} onDataFetch={handleDataFetch} />
      {Object.keys(data).length > 0 && <StandingsBoard data={data} selectedLeague={leagueSport.league} />}
    </div>
  );
}
