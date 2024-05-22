import React from "react";
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

const ReloadPage = () => {
  window.location.reload();
};
window.adminWindow = null;

const Navbar = () => {
  const openAdminPage = () => {
    if (!window.adminWindow || window.adminWindow.closed) {
      window.adminWindow = window.open("/LLMfront/admin.html", "_blank");
    } else {
      window.adminWindow.focus();
    }
  };


  return (
    <div className="nav">
    <div className="navbar">
      <a href="" className="logo" >
        2TEAM
      </a>
      <div className="nav-links">
        <a href="" onClick={ReloadPage}>
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
        <button onClick={openAdminPage}>Manage Server</button>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
