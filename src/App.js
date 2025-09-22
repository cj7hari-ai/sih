import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentDashboard from "./components/StudentDashboard";
import FacultyDashboard from "./components/FacultyDashboard";
import OrganizationDashboard from "./components/OrganizationDashboard";
import Portfolio from "./components/Portfolio";
import RecruiterView from "./components/RecruiterView";
import { AccessibilityProvider } from "./components/AccessibilityProvider";
import KeyboardNavigation from "./components/KeyboardNavigation";
import VoiceNavigation from "./components/VoiceNavigation";
import "./App.css";

function App() {
  const [, setRole] = useState("");
  const [studentId, setStudentId] = useState("");
  const [college, setCollege] = useState("");
  const [activities, setActivities] = useState([]);
  const [registeredEntities, setRegisteredEntities] = useState([]);

  return (
    <AccessibilityProvider>
      <KeyboardNavigation />
      <VoiceNavigation />
      <Router>
        <Routes>
        <Route
          path="/"
          element={
            <Login
              setRole={setRole}
              setStudentId={setStudentId}
              setCollege={setCollege}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              registeredEntities={registeredEntities}
              setRegisteredEntities={setRegisteredEntities}
            />
          }
        />
        <Route
          path="/student/:id"
          element={
            <StudentDashboard
              studentId={studentId}
              college={college}
              activities={activities}
              setActivities={setActivities}
            />
          }
        />
        <Route
          path="/faculty"
          element={
            <FacultyDashboard
              activities={activities}
              setActivities={setActivities}
            />
          }
        />
        <Route
          path="/organization"
          element={
            <OrganizationDashboard
              activities={activities}
              setActivities={setActivities}
              registeredEntities={registeredEntities}
            />
          }
        />
        <Route
          path="/portfolio/:studentId"
          element={<Portfolio activities={activities} />}
        />
        <Route
          path="/recruiter"
          element={<RecruiterView activities={activities} />}
        />
        </Routes>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
