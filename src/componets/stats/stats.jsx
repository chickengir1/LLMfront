import React, { useState } from "react";
import Toast from "../toast/Toast";
import "./stats.css";


const Stats = () => {
  const [textarea, setTextarea] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [links, setLinks] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const ClickEvent = () => {
    setTextarea(true);
    setTitle("");
    setContent("");
    setLinks([""]);
  };

  const CancelEvent = () => {
    setTextarea(false);
    setTitle("");
    setContent("");
    setLinks([""]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleLinkChange = (index, event) => {
    const newLinks = [...links];
    newLinks[index] = event.target.value;
    setLinks(newLinks);
  };

  const addLinkField = () => {
    setLinks([...links, ""]);
  };

  const removeLinkField = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const AiGenerate = async () => {
    setLoading(true);
    setTextarea(false);
    try {
      setTimeout(async () => {
        const response = await fetch('/LLMfront/db.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        const currentIndex = data.length + 1;
        
        const id = `${currentIndex}`; 

        // id값 정수로 저장시 문제 발생
        // const id = currentIndex; 
        const newBox = { id, title, content, links };
  
        const saveResponse = await fetch('/api/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBox),
        });
  
        if (!saveResponse.ok) {
          throw new Error('Failed to save data');
        }
  
        setToast({ show: true, message: "생성이 완료되었습니다.", type: "success" });
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "생성 중 오류가 발생했습니다.", type: "error" });
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
            <div className="area">
            <input
              className="inputtitle"
              placeholder="제목을 입력하세요..."
              style={{ width: "14vw", height: "20px", marginBottom: "15px" }}
              value={title}
              onChange={handleTitleChange}
            />
            <textarea
              className="input"
              placeholder="내용을 입력하세요..."
              style={{ width: "30vw", height: "100px" }}
              value={content}
              onChange={handleContentChange}
            />
            {links.map((link, index) => (
              <div key={index} className="link-input">
                <input
                  type="text"
                  placeholder="링크를 입력하세요..."
                  value={link}
                  onChange={(e) => handleLinkChange(index, e)}
                />
                <button onClick={addLinkField}>+</button>
                <button onClick={() => removeLinkField(index)}>-</button>
              </div>
            ))}
            </div>
            <div className="row">
              <button className="submit" onClick={AiGenerate} disabled={title.trim() === "" || content.trim() === ""}>
                Generate
              </button>
              <button className="cancel" onClick={CancelEvent}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {loading && (
          <div className="loading">
            <div className="spinner">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
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
