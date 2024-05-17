import React, { useState, useEffect } from "react";
import "./stats.css";

const Stats = () => {
  const [textarea, setTextarea] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; 
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  const ClickEvent = () => {
    setTextarea(true);
    setInputValue("");
  };

  const CancelEvent = () => {
    setTextarea(false);
    setInputValue("");
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const AiGenerate = async () => {
    setLoading(true);
    setTextarea(false);
    try {
      // const response = await fetch("아직 덜 만듦", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ inputValue }),
      // });

      // if (!response.ok) {
      //   throw new Error("Error");
      // }

      // const data = await response.json();
      // console.log(data);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="stats">
        <span className="text">
          <h1 className="description">YouTube 알림을</h1> 사용해 볼 준비가 되셨나요 ?
        </span>
        <div className="btnbox">
          {!textarea && (
            <button className="started" onClick={ClickEvent} disabled={loading}>
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
              <button className="submit" onClick={AiGenerate} disabled={inputValue.trim() === ""}>
                Generate
              </button>
              <button className="cancel" onClick={CancelEvent} >
                Cancel
              </button>
            </div>
          </div>
        )}
        {loading &&
          <div className="loading">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Stats;
