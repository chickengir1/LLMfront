import React, { useState } from "react";
import Toast from "../toast/Toast";
import "./stats.css";

const Stats = () => {
  const [textarea, setTextarea] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

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
      let currentIndex = localStorage.getItem('currentIndex');
      if (!currentIndex) {
        currentIndex = 1;
      } else {
        currentIndex = parseInt(currentIndex, 10) + 1;
      }
      localStorage.setItem('currentIndex', currentIndex);

      const id = `box-${currentIndex}`;
      const newBox = { id, inputValue };

      localStorage.setItem(id, JSON.stringify(newBox));

      setToast({ show: true, message: "생성이 완료되었습니다.", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "생성 중 오류가 발생했습니다.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const closeToast = () => {
    setToast({ show: false, message: "", type: "" });
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
              <button className="cancel" onClick={CancelEvent}>
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
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
};

export default Stats;
