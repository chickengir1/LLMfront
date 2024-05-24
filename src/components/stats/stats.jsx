import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DISCORD_AUTH_URL, checkAuthStatus } from "../../utils/utils";
import "./stats.css";

const Stats = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthStatus(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [isLoggedIn]);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/input');
    } else {
      window.location.href = DISCORD_AUTH_URL;
    }
  };

  return (
    <div>
      <div className="stats">
        <span className="text">
          <h1 className="description">DISCORD BOT WITH</h1>
          <h1 className="description">Friendli LLM</h1> 사용해 볼 준비가 되셨나요?
        </span>
        <div className="btnbox">
          <button
            className="started"
            onClick={handleGetStarted}
            style={{
              backgroundColor: isLoggedIn ? '' : '#7289da',
              color: isLoggedIn ? '' : '#fff'
            }}
          >
            {isLoggedIn ? "GET STARTED" : "LOGIN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
