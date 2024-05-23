import React, { useState, useEffect } from "react";
import "./Navbar.css";

const PageMove1 = (e) => {
  e.preventDefault();
  const featuresSection = document.querySelector(".features");
  featuresSection.scrollIntoView({ behavior: "smooth" });
};

const PageMove2 = (e) => {
  e.preventDefault();
  const generateSection = document.querySelector(".stats");
  generateSection.scrollIntoView({ behavior: "smooth" });
};

const ReloadPage = (e) => {
  e.preventDefault();
  window.location.reload();
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        sessionStorage.setItem("discord_access_token", token);
        setIsLoggedIn(true);
      } else {
        const accessToken = sessionStorage.getItem("discord_access_token");
        if (accessToken) {
          setIsLoggedIn(true);
        }
      }
    };

    checkAuthStatus();
  }, []);

  const openAdminPage = () => {
    if (isLoggedIn) {
      if (!window.adminWindow || window.adminWindow.closed) {
        window.adminWindow = window.open("/LLMfront/admin.html", "_blank");
      } else {
        window.adminWindow.focus();
      }
    } else {
      window.location.href = "http://localhost:3000/auth/discord";
    }
  };

  return (
    <div className="nav">
      <div className="navbar">
        <a href="#" className="logo">
          2TEAM
        </a>
        <div className="nav-links">
          <a href="#" onClick={ReloadPage}>
            Home
          </a>
          <a href="#" onClick={PageMove1}>
            Feature
          </a>
          <a href="#" onClick={PageMove2}>
            Generate
          </a>
        </div>
        <div className="manage-btn">
          <button onClick={openAdminPage}>
            {isLoggedIn ? "Manage Server" : "LOGIN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
