import { useState } from "react";
import LandingPage from "./components/LandingPage.jsx";
import GymTracker from "./components/GymTracker.jsx";
import ChatApp from "./components/ChatApp.jsx";
import MirinPage from "./components/MirinPage.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  return (
    <>
      {currentPage === "landing" && <LandingPage setPage={setCurrentPage} />}
      {currentPage === "gym" && <GymTracker setPage={setCurrentPage} />}
      {currentPage === "chat" && <ChatApp setPage={setCurrentPage} />}
      {currentPage === "mirin" && <MirinPage setPage={setCurrentPage} />}
    </>
  );
}

export default App;
