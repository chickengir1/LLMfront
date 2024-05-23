import React, { useState, useEffect } from "react";
import Navbar from "../src/componets/Navbar/Navbar";
import Home from "../src/componets/Home/Home";
import Features from "../src/componets/Features/Features";
import Stats from "../src/componets/stats/stats";
import Footer from "../src/componets/Footer/Footer";
import ScrollImg from "../src/assets/top.webp";

const App = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="apptop"></div>
      <Navbar />
      <Home />
      <div className="featuretop"></div>
      <Features />
      <div className="generate"></div>
      <Stats />
      <div className="generate"></div>
      <Footer />
      <img
        src={ScrollImg}
        alt=""
        className={`scrollToTop ${showScrollToTop ? "visible" : ""}`}
        onClick={scrollToTop}
      />
    </div>
  );
};

export default App;
