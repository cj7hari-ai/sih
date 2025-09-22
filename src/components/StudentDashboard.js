import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard({ studentId: propStudentId, college: propCollege, activities, setActivities }) {
  const { id: paramId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const collegeQuery = query.get("college") || "";

  // final values (props take precedence, then URL/query)
  const currentStudentId = propStudentId || paramId || "";
  const currentCollege = propCollege || collegeQuery || "";

  const normalize = (s) => String(s || "").trim().toLowerCase();
  const hasStudentInfo = currentStudentId && currentCollege;

  // filter by BOTH studentId and college
  const myActivities = hasStudentInfo
    ? activities.filter(
        (a) =>
          normalize(a.studentId) === normalize(currentStudentId) &&
          normalize(a.college) === normalize(currentCollege)
      )
    : [];

  const handleVerify = (id) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === id &&
        normalize(a.studentId) === normalize(currentStudentId) &&
        normalize(a.college) === normalize(currentCollege)
          ? { ...a, status: "VerifiedByStudent" }
          : a
      )
    );
  };

  useEffect(() => {
    window.studentDashboardHandlers = {
      verify: () => {
        const pendingActivity = myActivities.find(a => a.status === "PendingVerification");
        if (pendingActivity) {
          handleVerify(pendingActivity.id);
          const announcer = document.getElementById('status-announcements');
          if (announcer) announcer.textContent = `Activity ${pendingActivity.title} has been verified`;
        }
      }
    };
    return () => {
      delete window.studentDashboardHandlers;
    };
  }, [myActivities, handleVerify]);

  return (
    <div className="student-dashboard" role="main">
      <button 
        className="back-btn" 
        onClick={() => window.history.back()}
        aria-label="Go back to previous page"
      >
        ⬅ Back
      </button>
      <h1 id="dashboard-title">
        CREDISPHERE - Student Dashboard ({currentStudentId || "unknown"} - {currentCollege || "unknown"})
      </h1>
      <div className="sr-only" aria-live="polite" id="status-announcements"></div>

      {!hasStudentInfo && (
        <p className="warning">
          College not specified. Please login via the main page (login), or open this route with{" "}
          <code>?college=CollegeName</code>.
        </p>
      )}

      <section aria-labelledby="activities-heading">
        <h2 id="activities-heading">My Activities</h2>
        {myActivities.length === 0 ? (
          <p role="status">No activities yet.</p>
        ) : (
          <ul aria-label="Student activities">
            {myActivities.map((a) => (
              <li key={a.id}>
                <span>
                  {a.title} ({a.type}) - <strong aria-label={`Status: ${a.status}`}>{a.status}</strong>
                </span>
                {a.status === "PendingVerification" && (
                  <div className="action-btns">
                    <button 
                      onClick={() => {
                        handleVerify(a.id);
                        const announcer = document.getElementById('status-announcements');
                        if (announcer) announcer.textContent = `Activity ${a.title} has been verified`;
                      }}
                      aria-describedby={`verify-help-${a.id}`}
                    >
                      Verify
                    </button>
                    <div id={`verify-help-${a.id}`} className="sr-only">
                      Verify that you completed this activity: {a.title}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default StudentDashboard;
