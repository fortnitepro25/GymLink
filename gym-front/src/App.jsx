import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import WorkoutLog from "./pages/WorkoutLog";
import Chat from "./pages/Chat";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // home, dashboard, log, chat

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="bg-black border-b border-zinc-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">GymLink</h1>

          <div className="flex gap-6">
            <button
              onClick={() => setCurrentPage("home")}
              className="hover:text-orange-500"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("dashboard")}
              className="hover:text-orange-500"
            >
              Progress
            </button>
            <button
              onClick={() => setCurrentPage("log")}
              className="hover:text-orange-500"
            >
              Log Workout
            </button>
            <button
              onClick={() => setCurrentPage("chat")}
              className="hover:text-orange-500"
            >
              Chat Room
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        {currentPage === "home" && (
          <div className="text-center py-20">
            <h1 className="text-6xl font-bold mb-6">GymLink</h1>
            <p className="text-2xl text-zinc-400 mb-10">
              Track your lifts. Share your progress. Talk with other lifters.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setCurrentPage("dashboard")}
                className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-lg text-lg font-medium"
              >
                View Progress
              </button>

              <button
                onClick={() => setCurrentPage("log")}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 px-10 py-4 rounded-lg text-lg font-medium"
              >
                Log Workout
              </button>

              <button
                onClick={() => setCurrentPage("chat")}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 px-10 py-4 rounded-lg text-lg font-medium"
              >
                Join Chat Room
              </button>
            </div>
          </div>
        )}

        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "log" && <WorkoutLog />}
        {currentPage === "chat" && <Chat />}
      </div>
    </div>
  );
}

export default App;
