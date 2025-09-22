import React, { useState } from "react";
import "./OrganizationDashboard.css";

function OrganizationDashboard({ activities, setActivities, registeredEntities }) {
  const [form, setForm] = useState({
    studentId: "",
    college: "",
    title: "",
    type: "academic",
    file: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newActivity = {
      id: Date.now(),
      studentId: form.studentId,
      college: form.college,
      title: form.title,
      type: form.type,
      file: form.file ? form.file.name : "",
      status: "PendingVerification",
      uploadedBy: "organization",
    };
    setActivities([...(activities || []), newActivity]);
    setForm({ studentId: "", college: "", title: "", type: "academic", file: null });
    alert("Activity uploaded successfully!");
  };

  // Check if any organizations are registered
  const hasRegisteredOrgs = registeredEntities?.some(entity => entity.type === "organization");
  
  if (!hasRegisteredOrgs) {
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
            <h2>Organization Dashboard</h2>
            <p className="dashboard-slogan">Manage and verify institution records</p>
            <div className="registration-required">
              <p>⚠️ No registered organizations found.</p>
              <p>Please register your organization first to access this dashboard.</p>
              <button onClick={() => window.location.href = "/register"} className="register-btn org-register-btn">
                Register Organization
              </button>
              <button onClick={() => window.history.back()} className="back-btn">
                ⬅ Back
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

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
          <h2>Organization Dashboard</h2>
          <p className="dashboard-slogan">Manage and verify institution records</p>
          <button 
            className="back-btn" 
            onClick={() => window.history.back()}
            aria-label="Go back to previous page"
          >
            ⬅ Back
          </button>
          <p className="subtitle">
            Upload certificates/events for students by selecting their <b>College</b> and <b>Student ID</b>.
          </p>

          <form onSubmit={handleSubmit} className="org-form">
            <input type="text" placeholder="College Name" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} required />
            <input type="text" placeholder="Student ID" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} required />
            <input type="text" placeholder="Activity Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="academic">Academic</option>
              <option value="co-curricular">Co-curricular</option>
              <option value="extracurricular">Extracurricular</option>
            </select>
            <input type="file" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />
            <button type="submit" className="org-submit-btn">Upload Certificate</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default OrganizationDashboard;
