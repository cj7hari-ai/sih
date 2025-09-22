import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

function Login({ setRole, setStudentId, setCollege }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [localStudentId, setLocalStudentId] = useState("");
  const [localCollege, setLocalCollege] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    window.voiceInputHandlers = {
      setCollege: (value) => {
        setLocalCollege(value);
        console.log('College set to:', value);
        
        setTimeout(() => {
          if (value.trim() && localStudentId.trim() && localStudentId.length >= 3) {
            console.log('Auto-logging in with College:', value, 'ID:', localStudentId);
            setRole("student");
            setStudentId(localStudentId);
            setCollege(value);
            navigate(`/student/${encodeURIComponent(localStudentId)}?college=${encodeURIComponent(value)}`);
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance('Logging in automatically');
              speechSynthesis.speak(utterance);
            }
          }
        }, 500);
      },
      setStudentId: (value) => {
        setLocalStudentId(value);
        console.log('Student ID set to:', value);
        
        setTimeout(() => {
          if (value.trim() && localCollege.trim() && value.length >= 3) {
            console.log('Auto-logging in with College:', localCollege, 'ID:', value);
            setRole("student");
            setStudentId(value);
            setCollege(localCollege);
            navigate(`/student/${encodeURIComponent(value)}?college=${encodeURIComponent(localCollege)}`);
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance('Logging in automatically');
              speechSynthesis.speak(utterance);
            }
          }
        }, 500);
      },
      login: () => {
        console.log('Voice login attempt - College:', localCollege, 'ID:', localStudentId);
        if (!localStudentId.trim() || !localCollege.trim()) {
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Please provide college name and student ID first');
            speechSynthesis.speak(utterance);
          }
          return;
        }
        setRole("student");
        setStudentId(localStudentId);
        setCollege(localCollege);
        navigate(`/student/${encodeURIComponent(localStudentId)}?college=${encodeURIComponent(localCollege)}`);
      }
    };
    return () => {
      delete window.voiceInputHandlers;
    };
  }, [localStudentId, localCollege, navigate, setRole, setStudentId, setCollege]);

  const handleStudentLogin = () => {
    if (!localStudentId.trim() || !localCollege.trim()) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Please provide college name and student ID first');
        speechSynthesis.speak(utterance);
      }
      console.log('Missing fields - College:', localCollege, 'Student ID:', localStudentId);
      return;
    }
    setRole("student");
    setStudentId(localStudentId);
    setCollege(localCollege);
    navigate(`/student/${encodeURIComponent(localStudentId)}?college=${encodeURIComponent(localCollege)}`);
  };

  const handleFacultyLogin = () => {
    setRole("faculty");
    navigate("/faculty");
  };

  const handleOrgLogin = () => {
    setRole("organization");
    navigate("/organization");
  };

  const handlePortfolioView = () => {
    if (!localStudentId.trim() || !localCollege.trim()) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance('Please provide college name and student ID first');
        speechSynthesis.speak(utterance);
      }
      return;
    }
    navigate(`/portfolio/${encodeURIComponent(localStudentId)}?college=${encodeURIComponent(localCollege)}`);
  };

  return (
    <>
    <div className="team-logo">
      <img src="/ourlogo.png" alt="SprintX Team Logo" className="team-logo-img" onError={(e) => e.target.style.display = 'none'} />
    </div>
    <div className="hero-layout">
      <div className="hero-left">
        <div className="title-with-logo">
          <img src="/ChatGPT%20Image%20Sep%2020,%202025,%2011_47_49%20PM.png" alt="CREDISPHERE Logo" className="logo" onError={(e) => e.target.style.display = 'none'} />
          <div className="brand-text">
            <h1 id="main-heading">CREDISPHERE</h1>
            <p className="tagline">Empowering Digital Credentials</p>
          </div>
        </div>
      </div>
      
      <div className="hero-right">
        <div className={`combined-card ${!isHomePage ? 'login-only' : ''}`} role="main">
          <div className="login-section">
            {!selectedRole && (
              <>
                <h2>Login</h2>
                <p className="microcopy">Secure, verifiable credentials for students & institutions</p>
              </>
            )}
            <div className="sr-only" aria-live="polite" id="announcements"></div>

            {!selectedRole && isHomePage && (
              <div className="role-buttons" role="group" aria-labelledby="main-heading">
                <div className="login-option">
                  <button 
                    onClick={() => setSelectedRole("student")}
                    className="gradient-btn student-btn"
                  >
                    Student Login
                  </button>
                  <p className="btn-subtext">Access your personal dashboard to view and verify activities</p>
                </div>
                
                <div className="login-option">
                  <button 
                    onClick={handleFacultyLogin}
                    className="gradient-btn faculty-btn"
                  >
                    Faculty Login
                  </button>
                  <p className="btn-subtext">Review and approve student activities</p>
                </div>
                
                <div className="login-option">
                  <button 
                    onClick={handleOrgLogin}
                    className="gradient-btn org-btn"
                  >
                    Organization Login
                  </button>
                  <p className="btn-subtext">Manage and verify institution records</p>
                </div>
                
                <div className="login-option">
                  <button 
                    onClick={() => setSelectedRole("portfolio")}
                    className="gradient-btn portfolio-btn"
                  >
                    View Portfolio
                  </button>
                  <p className="btn-subtext">Preview verified student credentials</p>
                </div>
              </div>
            )}

            {selectedRole === "student" && (
              <form className="login-form compact" onSubmit={(e) => { e.preventDefault(); handleStudentLogin(); }}>
                <h2>Student Login</h2>
                <input 
                  type="text" 
                  placeholder="College Name" 
                  value={localCollege} 
                  onChange={(e) => setLocalCollege(e.target.value)}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Student ID" 
                  value={localStudentId} 
                  onChange={(e) => setLocalStudentId(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
                <button type="button" className="back-btn" onClick={() => setSelectedRole(null)}>← Back</button>
              </form>
            )}



            {selectedRole === "portfolio" && (
              <div className="login-form compact">
                <h2>View Portfolio</h2>
                <input type="text" placeholder="College Name" value={localCollege} onChange={(e) => setLocalCollege(e.target.value)} />
                <input type="text" placeholder="Student ID" value={localStudentId} onChange={(e) => setLocalStudentId(e.target.value)} />
                <button onClick={handlePortfolioView}>View Portfolio</button>
                <button type="button" className="back-btn" onClick={() => setSelectedRole(null)}>← Back</button>
              </div>
            )}
          </div>
          
          {!selectedRole && isHomePage && (
            <div className="register-section">
              <h2>New User?</h2>
              <p>Register your organization or college to get started</p>
              <button 
                onClick={() => navigate("/register")}
                className="cta-primary pulsing-glow"
              >
                REGISTER ORGANIZATION/COLLEGE
              </button>
              <button className="cta-secondary" onClick={() => alert('Learn more about Credisphere!')}>
                Why Credisphere? → Learn More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    
    {isHomePage && (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#help">Help</a>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
          <div className="trusted-by">
            <span>Trusted by leading institutions</span>
          </div>
        </div>
      </footer>
    )}
    </>
  );
}

export default Login;