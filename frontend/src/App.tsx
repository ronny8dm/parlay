/** @format */

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LeagueTabs from "./components/leagueTabs/LeagueTabs";
import theme from "./theme.tsx";

// interface Team {
//   id: string;
//   uid: string;
//   slug: string;
//   abbreviation: string;
//   displayName: string;
//   shortDisplayName: string;
//   name: string;
//   nickname: string;
//   location: string;
//   color: string;
//   alternateColor: string;
// }

// interface League {
//   id: string;
//   uid: string;
//   name: string;
//   abbreviation: string;
//   shortName: string;
//   slug: string;
//   teams: { team: Team }[];
// }

// interface Sport {
//   id: string;
//   uid: string;
//   name: string;
//   slug: string;
//   leagues: League[];
// }

// interface ResponseData {
//   [key: string]: {
//     sports: Sport[];
//   };
// }

function App() {
  //   const URL = "http://localhost:8000";

  //   const [teams, setTeams] = useState<Team[]>([]);

  //   const fetchTeams = async () => {
  //     try {
  //       const response = await axios.get<ResponseData>(`${URL}/basketball/teams`);
  //       const data = response.data;

  //       const teamArray: Team[] = [];
  //       Object.values(data).forEach((sportData) => {
  //         sportData.sports.forEach((sport) => {
  //           sport.leagues.forEach((league) => {
  //             league.teams.forEach((teamObj) => {
  //               teamArray.push(teamObj.team);
  //             });
  //           });
  //         });
  //       });

  //       setTeams(teamArray);
  //       console.log(teamArray);
  //     } catch (error) {
  //       console.error("Error fetching fetching teams: ", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchTeams();
  //   }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="grow my-20 p-2">
          <LeagueTabs />
          <h1 className="text-3xl text-white font-bold underline">Teams</h1>
          {/* <ul>
          {Array.isArray(teams) &&
            teams.map((team, index) => <li key={index}>{team.displayName}</li>)}
        </ul> */}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
