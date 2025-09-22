import React, { useState } from "react";
import "./FacultyDashboard.css";

function FacultyDashboard({ activities, setActivities }) {
  const [filterId, setFilterId] = useState("");

  const handleApproval = (id, status) => {
    setActivities(
      activities.map((a) =>
        a.id === id ? { ...a, status: status } : a
      )
    );
  };

  const filtered = filterId
    ? activities.filter((a) => a.studentId === filterId)
    : activities;

  return (
    <>
    <div className="team-logo">
      <img src="/ourlogo.png" alt="SprintX Team Logo" className="team-logo-img" onError={(e) => e.target.style.display = 'none'} />
    </div>
    <div className="dashboard-layout">
      <div className="dashboard-left">
        <div className="title-with-logo">
          <img src="/ChatGPT%20Image%20Sep%2020,%202025,%2011_47_49%20PM.png" alt="CREDISPHERE Logo" className="logo" onError={(e) => e.target.style.display = 'none'} />
          <div className="brand-text">
            <h1>CREDISPHERE</h1>
            <p className="tagline">Empowering Digital Credentials</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-right">
        <div className="dashboard-card">
          <h2>Faculty Dashboard</h2>
          <p className="dashboard-slogan">Review and approve student activities</p>
          <button 
            className="back-btn" 
            onClick={() => window.history.back()}
            aria-label="Go back to previous page"
          >
            ⬅ Back
          </button>
          <input
            type="text"
            placeholder="Filter by Student ID (optional)"
            value={filterId}
            onChange={(e) => setFilterId(e.target.value)}
          />

          {filtered.length === 0 ? (
            <p>No activities found.</p>
          ) : (
            <ul>
              {filtered.map((a) => (
                <li key={a.id}>
                  [{a.studentId}] {a.title} ({a.type}) - <b>{a.status}</b>
                  {a.status === "VerifiedByStudent" && (
                    <div className="action-btns">
                      <button onClick={() => handleApproval(a.id, "Approved")}>
                        Approve
                      </button>
                      <button onClick={() => handleApproval(a.id, "Rejected")}>
                        Reject
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

export default FacultyDashboard; 