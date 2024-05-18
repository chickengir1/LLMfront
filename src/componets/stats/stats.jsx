import React, { useState, useEffect } from "react";
import Toast from "../toast/Toast";
import "./stats.css";

const Stats = () => {
  const [textarea, setTextarea] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

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
      const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      // 실제 요청을 사용할 때 주석을 해제하세요.
      // const response = await fetch("http://localhost:3000/api/generate", {
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

      // 여기는 예시로 2초 동안 기다리는 코드입니다.
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (!window.adminWindow || window.adminWindow.closed) {
        window.adminWindow = window.open("/LLMfront/admin.html", "_blank");
        window.adminWindow.onload = () => {
          window.adminWindow.postMessage({
            id,
            boxContent: "New Box",
            className: 'new-box'
          }, 'http://localhost:5173/LLMfront/admin.html');
        };
      } else {
        window.adminWindow.postMessage({
          id,
          boxContent: "New Box",
          className: 'new-box'
        }, 'http://localhost:5173/LLMfront/admin.html');
      }
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
