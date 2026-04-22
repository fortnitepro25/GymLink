import { useEffect, useState } from "react";

export default function LandingPage({ setPage }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2000); // start fade out
    const t2 = setTimeout(() => setHidden(true), 3200);  // remove overlay

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {/* Intro Overlay */}
      {!hidden && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            opacity: fadeOut ? 0 : 1,
            transition: "opacity 1.2s ease",
          }}
        >
          <img
            src="/zyzz.png"
            alt="Zyzz"
            style={{
              width: "240px",
              transform: fadeOut ? "scale(1.08)" : "scale(1)",
              transition: "transform 1.2s ease",
              filter: "brightness(1.1) contrast(1.05)",
              marginBottom: "30px",
            }}
          />

          <h2
            style={{
              fontSize: "1.6rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            WE'RE ALL GONNA{" "}
            <span style={{ color: "#4d74ff" }}>MAKE IT</span>
          </h2>
        </div>
      )}

      {/* Main Page */}
      <div  
        style={{
          minHeight: "100vh",
          backgroundColor: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <h1 style={{ fontSize: "4.5rem", fontWeight: "bold", marginBottom: "20px" }}>
          Gym<span style={{ color: "#4d74ff" }}>Link</span>
        </h1>

        <p style={{ fontSize: "1.8rem", color: "#bbbbbb", marginBottom: "80px" }}>
          Track your gains.<br />Connect with the community.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "25px", width: "100%", maxWidth: "420px" }}>
          <button
            onClick={() => setPage("gym")}
            style={{
              padding: "30px",
              fontSize: "1.8rem",
              fontWeight: "600",
              border: "none",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #ffffff, #4f59c9)",
              color: "white",
              cursor: "pointer",
            }}
          >
            Gym Tracking
          </button>

          <button
            onClick={() => setPage("chat")}
            style={{
              padding: "30px",
              fontSize: "1.8rem",
              fontWeight: "600",
              border: "none",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #4d79ff, #e8df8c)",
              color: "white",
              cursor: "pointer",
            }}
          >
            Community Chat
          </button>
        </div>
      </div>
    </>
  );
}