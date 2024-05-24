import React, { useState, useEffect } from "react";
import "./Navbar.css";

const DISCORD_AUTH_URL = "http://localhost:3000/auth/discord";
const ADMIN_PAGE_URL = "/LLMfront/admin.html";

const PageMove1 = (e) => {
  e.preventDefault();
  document.querySelector(".features").scrollIntoView({ behavior: "smooth" });
};

const PageMove2 = (e) => {
  e.preventDefault();
  document.querySelector(".stats").scrollIntoView({ behavior: "smooth" });
};

const ReloadPage = (e) => {
  e.preventDefault();
  window.location.reload();
};

const checkAuthStatus = (setIsLoggedIn) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    console.log("Token found in URL:", token);
    sessionStorage.setItem("discord_access_token", token);
    setIsLoggedIn(true);
    window.history.replaceState({}, document.title, window.location.pathname);
  } else {
    const accessToken = sessionStorage.getItem("discord_access_token");
    if (accessToken) {
      console.log("Token found in sessionStorage:", accessToken);
      setIsLoggedIn(true);
    } else {
      console.log("No token found");
      setIsLoggedIn(false);
    }
  }
};

const openAdminPage = (isLoggedIn) => {
  if (isLoggedIn) {
    if (!window.adminWindow || window.adminWindow.closed) {
      window.adminWindow = window.open(ADMIN_PAGE_URL, "_blank");
    } else {
      window.adminWindow.focus();
    }
  } else {
    window.location.href = DISCORD_AUTH_URL;
  }
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthStatus(setIsLoggedIn);
  }, []);

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
          <button onClick={() => openAdminPage(isLoggedIn)}>
            {isLoggedIn ? "Manage Server" : "LOGIN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
