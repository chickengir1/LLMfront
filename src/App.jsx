import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Features from "./components/Features/Features";
import Stats from "./components/stats/stats";
import Footer from "./components/Footer/Footer";
import ScrollImg from "./assets/top.webp";
import InputPage from "./components/InputPage/InputPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const location = useLocation();

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

  const shouldRenderNavbar = location.pathname !== "/input";

  return (
    <div>
      <ScrollToTop />
      <div className="apptop"></div>
      {shouldRenderNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <div className="featuretop"></div>
            <Features />
            <div className="generate"></div>
            <Stats />
            <div className="generate"></div>
            <Footer />
          </>
        } />
        <Route path="/input" element={<InputPage />} />
      </Routes>
      {shouldRenderNavbar && (
        <img
          src={ScrollImg}
          alt=""
          className={`scrollToTop ${showScrollToTop ? "visible" : ""}`}
          onClick={scrollToTop}
        />
      )}
    </div>
  );
};

const AppWrapper = () => (
  <Router basename="/LLMfront">
    <App />
  </Router>
);

export default AppWrapper;
