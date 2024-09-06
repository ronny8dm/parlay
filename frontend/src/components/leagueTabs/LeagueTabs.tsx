/** @format */

import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./LeagueTabs.css";
import BaseballIcon from "../../assets/baseball.tsx";
import SoccerIcon from "../../assets/soccer.tsx";
import BasketballIcon from "../../assets/basketball.tsx";
import ClientAPI from "../../services/ClientAPI.tsx";

interface LeagueTabsProps {
  onLeagueChange: (
    newLeague: { league: string; sport: string },
    seasonId: number,
    fixtureId: number,
    upcomingFixture: any[]
  ) => void;
  handleOptionClick: (option: string) => void;
}

const api = ClientAPI();

export default function LeagueTabs(props: LeagueTabsProps) {
  const [value, setValue] = useState(0);
  const [leagues, setLeagues] = useState<any[]>([]);
  const delayDuration = 500;

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await api.getLeagues();
        const leaguesData = response.data;
        if (leaguesData && leaguesData.length > 0) {
          setLeagues(leaguesData);
          setTimeout(() => {
            handleChange(null, 0);
          }, delayDuration);
        } else {
          console.log("data not available");
        }
      } catch (error) {
        console.error("Failed to fetch leagues:", error);
      }
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    if (leagues.length > 0) {
      handleChange(null, 0);
    }
  }, [leagues]);
  const handleChange = async (
    event: React.SyntheticEvent | null,
    newValue: number
  ) => {
    setValue(newValue);
    const selectedLeague = leagues[newValue];
    if (selectedLeague) {
      const upcomingFixtures = selectedLeague.upcoming;
      const fixtureId =
        upcomingFixtures.length > 0 ? upcomingFixtures[0].id : null;
      props.onLeagueChange(
        {
          league: selectedLeague.name,
          sport: selectedLeague.sport_id.toString(),
        },

        selectedLeague.currentseason.id,
        fixtureId,
        upcomingFixtures
      );

      try {
        const seasonId = await api.getStandings(
          selectedLeague.currentseason.id
        );
        props.handleOptionClick("standings");
        return { seasonId, fixtureId };
      } catch (error) {}
    }
  };

  return (
    <div className="gap-2 flex flex-col items-center overflow-x-auto justify-center w-full">
      <Box
        sx={{
          maxWidth: { xs: 400, sm: 1080 },
        }}
        className="tab-box"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          className="tabs commons"
          sx={{
            "& .MuiTabs-scrollButtons": {
              border: "0px solid #e5e7eb",
              bgcolor: "#121320",
              color: "#e5e7eb",
              borderRadius: "10px",
            },
            "& button": {
              color: "#ffff",
              bgcolor: "#121320",
              borderRadius: "10px",
              fontFamily: "commons",
            },
            "& button:hover": {
              bgcolor: "#080a85",
              border: "2px solid",
              borderColor: "#5542ff",
              color: "#ffff",
            },
            "& button.Mui-selected": {
              border: "2px solid",
              borderColor: "#5542ff",
              bgcolor: "#080a85",
              color: "#ffff",
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
            gap: 1,
          }}
        >
          {leagues.map((league, index) => (
            <Tab key={league.id} icon={<SoccerIcon />} label={league.name} />
          ))}
        </Tabs>
      </Box>
    </div>
  );
}
