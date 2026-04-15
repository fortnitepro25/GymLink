import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import WorkoutLog from './pages/WorkoutLog';
import Chat from './pages/Chat';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="bg-black border-b border-zinc-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">GymLink</h1>
          <div className="flex gap-8">
            <button onClick={() => setCurrentPage('home')} className={`px-5 py-2 rounded ${currentPage === 'home' ? 'text-orange-500' : ''}`}>Home</button>
            <button onClick={() => setCurrentPage('dashboard')} className={`px-5 py-2 rounded ${currentPage === 'dashboard' ? 'text-orange-500' : ''}`}>Progress</button>
            <button onClick={() => setCurrentPage('log')} className={`px-5 py-2 rounded ${currentPage === 'log' ? 'text-orange-500' : ''}`}>Log Workout</button>
            <button onClick={() => setCurrentPage('chat')} className={`px-5 py-2 rounded ${currentPage === 'chat' ? 'text-orange-500' : ''}`}>Chat Room</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-10">
        {currentPage === 'home' && (
          <div className="text-center py-20">
            <h1 className="text-6xl font-bold mb-8">GymLink</h1>
            <p className="text-2xl text-zinc-400 mb-12">
              Track your lifts. Share your progress. Talk with other lifters.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="bg-orange-600 hover:bg-orange-700 px-12 py-4 rounded-lg text-lg font-medium"
              >
                View Progress
              </button>
              <button 
                onClick={() => setCurrentPage('log')}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 px-12 py-4 rounded-lg text-lg font-medium"
              >
                Log Workout
              </button>
              <button 
                onClick={() => setCurrentPage('chat')}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 px-12 py-4 rounded-lg text-lg font-medium"
              >
                Join Chat Room
              </button>
            </div>
          </div>
        )}

        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'log' && <WorkoutLog />}
        {currentPage === 'chat' && <Chat />}
      </div>
    </div>
  );
}

export default App;