import React from "react";
import "./navbar.css";
import logo from "../../assets/dico - 복사본 (11).webp";
import { Link } from "react-scroll";
import contactimg from "../../assets/dico - 복사본 (12).webp";

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <div className="desktopmenu">
        <Link className="desktopmenulistitem">Home</Link>
        <Link className="desktopmenulistitem">Profile</Link>
        <Link className="desktopmenulistitem">About</Link>
        <Link className="desktopmenulistitem">Clients</Link>
      </div>
      <button className="desktopmenubtn">
        <img src={contactimg} alt="contactimg" className="desktopmenuimg" />
        <div className="text">Aocount Discord</div>
      </button>
    </nav>
  );
};

export default Navbar;
