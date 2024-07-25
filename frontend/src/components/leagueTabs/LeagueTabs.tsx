/** @format */

import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./LeagueTabs.css";
import BaseballIcon from "../../assets/baseball.tsx";
import SoccerIcon from "../../assets/soccer.tsx";
import BasketballIcon from "../../assets/basketball.tsx";
import StatsOptions from "../statsOptions/StatsOptions.tsx";




export default function LeagueTabs() {
  const [value, setValue] = useState(0);
  const [league, setLeague] = useState("mlb");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue)
    switch (newValue) {
      case 0:
        setLeague("mlb");
        break;
      case 1:
        setLeague("premierLeague");
        break;
      case 2:
        setLeague("nba");
        break;
      default:
        setLeague("mlb");
    }
  };

  return (
    <div className=" gap-2 flex flex-col items-center overflow-x-auto justify-center w-full">
      
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
          <Tab icon={<BaseballIcon />} label="MLB" />
          <Tab icon={<SoccerIcon />} label="Premier league" />
          <Tab icon={<BasketballIcon />} label="NBA" />
        </Tabs>
      </Box>
      <StatsOptions league={league} />
    </div>
  );
}
