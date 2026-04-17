import { useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import GymTracker from './components/GymTracker.jsx';
import ChatApp from './components/ChatApp.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'gym', or 'chat'

  return (
    <>
      {currentPage === 'landing' && <LandingPage setPage={setCurrentPage} />}
      {currentPage === 'gym' && <GymTracker setPage={setCurrentPage} />}
      {currentPage === 'chat' && <ChatApp setPage={setCurrentPage} />}
    </>
  );
}

export default App;