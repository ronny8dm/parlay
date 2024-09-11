/** @format */

import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import "./assets/css/tailwind.css";
import "./assets/scss/tailwind.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import theme from "./theme.tsx";
import Board from "./components/board/Board.tsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "ltr");
    handleRouteChange();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="grow my-20 p-2">
          <Board />
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
function handleRouteChange() {
  throw new Error("Function not implemented.");
}
