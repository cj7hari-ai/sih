import React, { useState } from "react";
import "./RecruiterView.css";

function RecruiterView({ activities }) {
  const [searchId, setSearchId] = useState("");
  const [searchCollege, setSearchCollege] = useState("");

  const approved = activities.filter(
    (a) =>
      a.status === "Approved" &&
      (!searchId || a.studentId === searchId) &&
      (!searchCollege ||
        a.college.toLowerCase().includes(searchCollege.toLowerCase()))
  );

  return (
    <div className="container">
      <h2>Recruiter View</h2>
      <input
        type="text"
        placeholder="Filter by Student ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by College"
        value={searchCollege}
        onChange={(e) => setSearchCollege(e.target.value)}
      />

      {approved.length === 0 ? (
        <p>No approved activities found.</p>
      ) : (
        <ul>
          {approved.map((a) => (
            <li key={a.id}>
              [{a.studentId}] {a.title} ({a.type}) 📄 {a.file}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecruiterView;
