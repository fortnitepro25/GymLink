// Replace your entire src/components/GymTracker.jsx with this code
import { useState, useEffect } from 'react';

export default function GymTracker({ setPage }) {
  // ------------------- STATE -------------------
  const [bodyWeight, setBodyWeight] = useState(0);
  const [bodyWeightHistory, setBodyWeightHistory] = useState([]); // [{date: "2026-04-01", weight: 85}]

  const [selectedLift, setSelectedLift] = useState("Bench Press");
  const [liftWeight, setLiftWeight] = useState("");
  const [liftLogs, setLiftLogs] = useState([]); // [{date, lift, weight}]

  const commonLifts = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Overhead Press",
    "Barbell Row"
  ];

  // ------------------- LOAD FROM LOCALSTORAGE -------------------
  useEffect(() => {
    const savedWeight = localStorage.getItem("gymBodyWeightHistory");
    if (savedWeight) setBodyWeightHistory(JSON.parse(savedWeight));

    const savedLifts = localStorage.getItem("gymLiftLogs");
    if (savedLifts) setLiftLogs(JSON.parse(savedLifts));
  }, []);

  // ------------------- SAVE TO LOCALSTORAGE -------------------
  const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // ------------------- ADD BODY WEIGHT -------------------
  const addBodyWeight = () => {
    if (bodyWeight <= 0) return;
    const newEntry = {
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      weight: Number(bodyWeight)
    };
    const updated = [...bodyWeightHistory, newEntry].sort((a, b) => a.date.localeCompare(b.date));
    setBodyWeightHistory(updated);
    saveToStorage("gymBodyWeightHistory", updated);
    setBodyWeight(0); // reset input
  };

  // ------------------- ADD LIFT LOG -------------------
  const addLiftLog = () => {
    if (!liftWeight || liftWeight <= 0) return;
    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      lift: selectedLift,
      weight: Number(liftWeight)
    };
    const updated = [...liftLogs, newEntry].sort((a, b) => a.date.localeCompare(b.date));
    setLiftLogs(updated);
    saveToStorage("gymLiftLogs", updated);
    setLiftWeight("");
  };

  // ------------------- SIMPLE GRAPH DATA FOR SELECTED LIFT -------------------
  const getLiftGraphData = () => {
    const filtered = liftLogs
      .filter(log => log.lift === selectedLift)
      .sort((a, b) => a.date.localeCompare(b.date));

    if (filtered.length < 2) return null; // need at least 2 points for a line

    const minWeight = Math.min(...filtered.map(l => l.weight));
    const maxWeight = Math.max(...filtered.map(l => l.weight));
    const range = maxWeight - minWeight || 1;

    return filtered.map((log, index) => {
      const x = (index / (filtered.length - 1)) * 500; // 500px wide
      const y = 300 - ((log.weight - minWeight) / range) * 300; // 300px tall
      return { x, y, weight: log.weight, date: log.date };
    });
  };

  const graphPoints = getLiftGraphData();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a", padding: "30px", color: "#eee" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "2.8rem" }}>💪 Gym Tracking</h1>
        <button
          onClick={() => setPage("landing")}
          style={{
            padding: "12px 24px",
            background: "none",
            border: "1px solid #666",
            color: "#ccc",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* BODY WEIGHT SECTION */}
        <div style={{ backgroundColor: "#1f1f1f", padding: "25px", borderRadius: "16px", marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "15px" }}>Current Body Weight (kg)</h2>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <input
              type="number"
              value={bodyWeight || ""}
              onChange={e => setBodyWeight(e.target.value)}
              placeholder="e.g. 82"
              style={{
                padding: "15px",
                fontSize: "1.3rem",
                width: "180px",
                background: "#2a2a2a",
                border: "none",
                borderRadius: "8px",
                color: "#fff"
              }}
            />
            <button
              onClick={addBodyWeight}
              style={{
                padding: "15px 30px",
                background: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                cursor: "pointer"
              }}
            >
              Save Weight
            </button>
          </div>

          {/* Body Weight History Table */}
          {bodyWeightHistory.length > 0 && (
            <div style={{ marginTop: "25px" }}>
              <h3 style={{ marginBottom: "10px" }}>Weight History</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #444" }}>
                    <th style={{ textAlign: "left", padding: "10px" }}>Date</th>
                    <th style={{ textAlign: "left", padding: "10px" }}>Weight (kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {bodyWeightHistory.map((entry, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #333" }}>
                      <td style={{ padding: "10px" }}>{entry.date}</td>
                      <td style={{ padding: "10px" }}>{entry.weight} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* COMPOUND LIFTS SECTION */}
        <div style={{ backgroundColor: "#1f1f1f", padding: "25px", borderRadius: "16px" }}>
          <h2 style={{ marginBottom: "15px" }}>Log Compound Movement</h2>

          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "25px" }}>
            {/* Lift selector */}
            <select
              value={selectedLift}
              onChange={e => setSelectedLift(e.target.value)}
              style={{
                padding: "15px",
                fontSize: "1.2rem",
                background: "#2a2a2a",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                minWidth: "220px"
              }}
            >
              {commonLifts.map(lift => (
                <option key={lift} value={lift}>{lift}</option>
              ))}
            </select>

            {/* Weight input */}
            <input
              type="number"
              value={liftWeight}
              onChange={e => setLiftWeight(e.target.value)}
              placeholder="Weight used (kg)"
              style={{
                padding: "15px",
                fontSize: "1.3rem",
                width: "200px",
                background: "#2a2a2a",
                border: "none",
                borderRadius: "8px",
                color: "#fff"
              }}
            />

            <button
              onClick={addLiftLog}
              style={{
                padding: "15px 40px",
                background: "#4d79ff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.1rem",
                cursor: "pointer"
              }}
            >
              Log Lift
            </button>
          </div>

          {/* Progress Graph for selected lift */}
          {graphPoints && graphPoints.length >= 2 && (
            <div style={{ marginTop: "30px", marginBottom: "30px" }}>
              <h3 style={{ marginBottom: "10px" }}>
                {selectedLift} Progress
              </h3>
              <svg width="520" height="340" style={{ background: "#2a2a2a", borderRadius: "12px", padding: "10px" }}>
                {/* Grid lines */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line
                    key={i}
                    x1="20"
                    y1={20 + i * 50}
                    x2="500"
                    y2={20 + i * 50}
                    stroke="#444"
                    strokeWidth="1"
                  />
                ))}
                {/* Line */}
                <polyline
                  points={graphPoints.map(p => `${p.x + 20},${p.y + 20}`).join(" ")}
                  fill="none"
                  stroke="#ff4d4d"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* Dots + labels */}
                {graphPoints.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x + 20} cy={p.y + 20} r="6" fill="#ff4d4d" />
                    <text
                      x={p.x + 20}
                      y={p.y + 10}
                      fill="#ccc"
                      fontSize="12"
                      textAnchor="middle"
                    >
                      {p.weight}kg
                    </text>
                    <text
                      x={p.x + 20}
                      y={330}
                      fill="#888"
                      fontSize="11"
                      textAnchor="middle"
                    >
                      {p.date.slice(5)} {/* MM-DD */}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          )}

          {/* Lift History Table */}
          <h3 style={{ marginBottom: "10px" }}>All Lift Logs</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #444" }}>
                <th style={{ textAlign: "left", padding: "12px" }}>Date</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Lift</th>
                <th style={{ textAlign: "left", padding: "12px" }}>Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {liftLogs.map((log, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #333" }}>
                  <td style={{ padding: "12px" }}>{log.date}</td>
                  <td style={{ padding: "12px" }}>{log.lift}</td>
                  <td style={{ padding: "12px" }}>{log.weight} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}