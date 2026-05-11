import { useState } from "react";

import LandingPage from "./components/LandingPage.jsx";
import GymTracker from "./components/GymTracker.jsx";
import ChatApp from "./components/ChatApp.jsx";
import MirinPage from "./components/MirinPage.jsx";
import Login from "./components/Login.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage("gym");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage("landing");
  };

  return (
    <>
      {currentPage === "landing" && <LandingPage setPage={setCurrentPage} />}
      
      {currentPage === "login" && (
        <Login 
          setPage={setCurrentPage} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}

      {currentPage === "gym" && (
        <GymTracker 
          setPage={setCurrentPage} 
          user={user}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "chat" && (
        <ChatApp 
          setPage={setCurrentPage} 
          user={user}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "mirin" && (
        <MirinPage 
          setPage={setCurrentPage} 
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;