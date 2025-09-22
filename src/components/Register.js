import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register({ registeredEntities, setRegisteredEntities }) {
  const [selectedType, setSelectedType] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntity = {
      id: Date.now(),
      ...form,
      type: selectedType,
      registeredAt: new Date().toISOString()
    };
    
    setRegisteredEntities([...(registeredEntities || []), newEntity]);
    alert(`${selectedType} registered successfully!`);
    navigate("/");
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
            <h1>CREDISPHERE</h1>
            <p className="tagline">Empowering Digital Credentials</p>
          </div>
        </div>
      </div>
      
      <div className="hero-right">
        <div className="combined-card login-only" role="main">
          <div className="register-content">
            {!selectedType && (
              <>
                <h2>Register</h2>
                <p className="microcopy">Join the digital credentials revolution</p>
                <div className="register-buttons">
                  <button onClick={() => setSelectedType("organization")} className="gradient-btn org-btn register-option-btn">
                    Register Organization
                  </button>
                  <button onClick={() => setSelectedType("college")} className="gradient-btn faculty-btn register-option-btn">
                    Register College
                  </button>
                  <button className="back-btn" onClick={() => navigate("/")}>
                    ⬅ Back to Login
                  </button>
                </div>
              </>
            )}

            {selectedType && (
              <form className="register-form compact" onSubmit={handleSubmit}>
                <h2>Register {selectedType === "organization" ? "Organization" : "College"}</h2>
                
                <input
                  type="text"
                  placeholder={`${selectedType === "organization" ? "Organization" : "College"} Name`}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit phone number"
                  required
                />
                
                <textarea
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
                
                <button type="submit" className="register-submit-btn">Register {selectedType === "organization" ? "Organization" : "College"}</button>
                <button type="button" className="back-btn" onClick={() => setSelectedType(null)}>
                  ⬅ Back
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;