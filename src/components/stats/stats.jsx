import React from "react";
import { useNavigate } from "react-router-dom";
import "./stats.css";

const Stats = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/input');
  };

  return (
    <div>
      <div className="stats">
        <span className="text">
          <h1 className="description">DISCORD BOT WITH</h1>
          <h1 className="description">Friendli LLM</h1> 사용해 볼 준비가 되셨나요?
        </span>
        <div className="btnbox">
          <button className="started" onClick={handleGetStarted}>
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stats;
