// src/components/Portfolio.js
import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./Portfolio.css";

function Portfolio({ activities }) {
  const { studentId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const college = query.get("college") || "";

  const normalize = (s) => String(s || "").trim().toLowerCase();

  // all approved activities for this student (across colleges)
  const approvedAll = activities.filter(
    (a) => normalize(a.studentId) === normalize(studentId) && a.status === "Approved"
  );

  // if college provided, narrow down
  const approved = college
    ? approvedAll.filter((a) => normalize(a.college) === normalize(college))
    : approvedAll;

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slower for better comprehension
      utterance.volume = 1.0; // Full volume
      utterance.pitch = 1.0;
      
      // Start speaking immediately
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Automatically read portfolio contents when page loads
    const readPortfolio = () => {
      if (approved.length === 0) {
        speak(`Portfolio for student ${studentId}. No approved activities found.`);
      } else {
        let content = `Digital Portfolio for student ${studentId}. You have ${approved.length} approved activities. `;
        approved.forEach((activity, index) => {
          content += `Activity ${index + 1}: ${activity.title}, activity type is ${activity.type}. `;
        });
        content += 'End of portfolio.';
        speak(content);
      }
    };
    
    // Start reading immediately when component mounts
    setTimeout(readPortfolio, 500);
  }, [studentId, approved]);

  if (approved.length === 0) {
    return (
      <div className="container">
        <button 
          className="back-btn" 
          onClick={() => window.history.back()}
          aria-label="Go back to previous page"
        >
          ⬅ Back
        </button>
        <h2>CREDISPHERE - Digital Portfolio ({studentId})</h2>
        {college ? (
          <p>No approved activities for this student in <b>{college}</b>.</p>
        ) : (
          <p>No approved activities found. (Or try viewing with <code>?college=CollegeName</code>)</p>
        )}
      </div>
    );
  }

  // If college not provided, group by college so user sees which college each activity belongs to.
  if (!college) {
    const byCollege = approved.reduce((acc, a) => {
      acc[a.college] = acc[a.college] || [];
      acc[a.college].push(a);
      return acc;
    }, {});

    return (
      <div className="container">
        <button 
          className="back-btn" 
          onClick={() => window.history.back()}
          aria-label="Go back to previous page"
        >
          ⬅ Back
        </button>
        <h2>CREDISPHERE - Digital Portfolio ({studentId}) — grouped by college</h2>
        {Object.keys(byCollege).map((col) => (
          <div key={col}>
            <h3>{col}</h3>
            <ul>
              {byCollege[col].map((a) => (
                <li key={a.id}>
                  ✅ <strong>{a.title}</strong> ({a.type}) {a.file && <span>📄 {a.file}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // normal render (college provided)
  return (
    <div className="container">
      <button 
        className="back-btn" 
        onClick={() => window.history.back()}
        aria-label="Go back to previous page"
      >
        ⬅ Back
      </button>
      <h2>CREDISPHERE - Digital Portfolio ({studentId}) — {college}</h2>
      <ul>
        {approved.map((a) => (
          <li key={a.id}>
            ✅ <strong>{a.title}</strong> ({a.type}) {a.file && <span>📄 {a.file}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;
