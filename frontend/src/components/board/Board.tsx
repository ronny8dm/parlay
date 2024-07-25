/** @format */

import React, { useState } from 'react';
import LeagueTabs from '../leagueTabs/LeagueTabs';
import StatsOptions from '../statsOptions/StatsOptions';
// import StandingsTable from '../standingsTable/StandingsTable';

export default function Board() { // Make sure the function name matches your export default
  const [league, setLeague] = useState("mlb");
  const [data, setData] = useState(null);

  const handleLeagueChange = (newLeague: string) => {
    setLeague(newLeague);
  };

  console.log("Board render", { handleLeagueChange });

  const handleDataFetch = (fetchedData: any) => {
    setData(fetchedData);
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <LeagueTabs league={league} onLeagueChange={handleLeagueChange} />
      <StatsOptions league={league} onDataFetch={handleDataFetch} />
      {/* {data && <StandingsTable data={data} />} */}
    </div>
  );
}
