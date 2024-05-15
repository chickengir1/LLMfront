import React, { useState } from "react";
import "./stats.css";

const Stats = () => {
  const [textarea, setTextarea] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const ClickEvent = () => {
    setTextarea(true);
  };

  const CancelEvent = () => {
    setTextarea(false);
    setInputValue('');
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const AiGenerate = async () => {
    try {
      const response = await fetch('아직 덜 만듦', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ inputValue }),
      });
  
      if (!response.ok) {
        throw new Error('Error');
      }
  
      const data = await response.json();
      console.log(data);
  
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <div className="stats">
        <span className="text">
          <h1>YouTube 알림을</h1> 사용해 볼 준비가 되셨나요 ?
        </span>
        <div className="btnbox">
          {!textarea && (
            <button className="started" onClick={ClickEvent}>
              GET STARTED
            </button>
          )}
        </div>
        {textarea && (
          <div className="textarea">
            <textarea
              className="input"
              placeholder="입력하세요..."
              style={{ width: "30vw", height: "100px" }}
              value={inputValue}
              onChange={handleChange}
            />
            <div className="row">
              <button className="submit" onClick={AiGenerate}>
                Generate
              </button>
              <button className="cancel" onClick={CancelEvent}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
