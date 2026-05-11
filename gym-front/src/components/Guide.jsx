// src/components/Guide.jsx
import React, { useState } from "react";
import "../guide.css";

const Guide = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState('training');

  return (
    <div className="guide-container">
      <div className="guide-header">
        <h1>🏋️ Muscle Building & Bodybuilding Guide</h1>
        <p>Complete guide to build muscle, track progress, and compete safely</p>
        </div>
        
    

          <div style={{ padding: "30px" }}>
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ fontSize: "2.8rem" }}>Guide</h1>
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

      <div className="tabs">
        <button 
          className={activeTab === 'training' ? 'active' : ''} 
          onClick={() => setActiveTab('training')}
        >
          Training
        </button>
        <button 
          className={activeTab === 'nutrition' ? 'active' : ''} 
          onClick={() => setActiveTab('nutrition')}
        >
          Nutrition
        </button>
        <button 
          className={activeTab === 'supplements' ? 'active' : ''} 
          onClick={() => setActiveTab('supplements')}
        >
          Supplements
        </button>
        <button 
          className={activeTab === 'peds' ? 'active' : ''} 
          onClick={() => setActiveTab('peds')}
        >
          Advanced (PEDs)
        </button>
      </div>

      <div className="guide-content">
        {activeTab === 'training' && (
          <section>
            <h2>Training for Hypertrophy</h2>
            <ul>
              <li><strong>Progressive Overload</strong>: Increase weight/reps over time</li>
              <li><strong>Key Compounds</strong>: Squat, Deadlift, Bench, Overhead Press, Rows, Pull-ups</li>
              <li><strong>Weekly Volume</strong>: 10-20 sets per muscle group</li>
              <li><strong>Rep Range</strong>: 6-15 reps for most exercises</li>
              <li>Recommended Split: Push/Pull/Legs or Upper/Lower 4-6 days/week</li>
            </ul>
            <p>Use GymLink to log every workout and track your strength progress in real-time.</p>
          </section>
        )}

        {activeTab === 'nutrition' && (
          <section>
            <h2>Nutrition for Muscle Growth</h2>
            <p><strong>Caloric Surplus</strong>: +250 to +500 above maintenance</p>
            
            <div className="macro-grid">
              <div>Protein: <strong>1.6 - 2.2g/kg</strong></div>
              <div>Carbs: <strong>4 - 7g/kg</strong></div>
              <div>Fats: <strong>0.5 - 1g/kg</strong></div>
            </div>

            <h3>Best Food Sources</h3>
            <ul>
              <li>Protein: Chicken, Beef, Fish, Eggs, Greek Yogurt, Whey</li>
              <li>Carbs: Rice, Oats, Potatoes, Fruits, Vegetables</li>
              <li>Fats: Avocado, Nuts, Olive Oil, Fatty Fish</li>
            </ul>
          </section>
        )}

        {activeTab === 'supplements' && (
          <section>
            <h2>Proven Supplements</h2>
            <ul>
              <li><strong>Creatine Monohydrate</strong> — 5g daily (most effective)</li>
              <li><strong>Whey Protein</strong> — Helps hit daily protein target</li>
              <li><strong>Beta-Alanine</strong> — 3-6g/day for endurance</li>
              <li><strong>Caffeine</strong> — 3-6mg/kg pre-workout</li>
              <li>Vitamin D, Omega-3, Magnesium (if diet is lacking)</li>
            </ul>
          </section>
        )}

        {activeTab === 'peds' && (
          <section className="warning-section">
            <h2>⚠️ Competitive Bodybuilding & PEDs</h2>
            <p><strong>Strongly Recommended:</strong> Maximize your natural potential first (minimum 3-5 years consistent training).</p>
            
            <div className="risk-box">
              <h3>Health Risks Include:</h3>
              <ul>
                <li>Hormonal shutdown</li>
                <li>Cardiovascular issues</li>
                <li>Liver & Kidney strain</li>
                <li>Infertility and mood disorders</li>
              </ul>
            </div>

            <p>If you decide to go this route: Get regular bloodwork, use proper cycle support, and do PCT.</p>
            <p><strong>Always consult a doctor.</strong> This is for educational purposes only.</p>
          </section>
        )}
      </div>

      <div className="guide-footer">
        <p>Track your journey on <strong>GymLink</strong> • Log workouts • Chat with training partners • Monitor progress</p>
      </div>
    </div>
    </div>
  );

};

export default Guide;