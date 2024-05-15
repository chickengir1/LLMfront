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

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="#" className="logo">
        Logo
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
        <button>Manage Server</button>
      </div>
    </div>
  );
};

export default Navbar;
