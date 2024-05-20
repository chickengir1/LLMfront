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

  const handleTextareaToggle = (reset = false) => {
    setTextarea(!textarea);
    if (reset) {
      setTitle("");
      setContent("");
      setLinks([""]);
    }
  };

  const handleChange = (setter) => (event) => setter(event.target.value);

  const handleLinkChange = (index) => (event) => {
    const newLinks = [...links];
    newLinks[index] = event.target.value;
    setLinks(newLinks);
  };

  const handleLinkField = (index, action) => {
    if (action === "add") {
      setLinks([...links, ""]);
    } else {
      setLinks(links.filter((_, i) => i !== index));
    }
  };

  const AiGenerate = async () => {
    setLoading(true);
    handleTextareaToggle();

    try {
      const response = await fetch('/LLMfront/db.json');
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();


       const id = data.length + 1;
       // id 값 정수로 전달시 반영 안됨 해결 못함 아직
      //const id = `${data.length + 1}`;
      const newBox = { id, title, content, links };

      const saveResponse = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBox),
      });

      if (!saveResponse.ok) throw new Error('Failed to save data');

      setToast({ show: true, message: "생성이 완료되었습니다.", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "생성 중 오류가 발생했습니다.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="stats">
        <span className="text">
          <h1 className="description">YouTube 알림을</h1> 사용해 볼 준비가 되셨나요?
        </span>
        <div className="btnbox">
          {!textarea && (
            <button className="started" onClick={() => handleTextareaToggle()} disabled={loading}>
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
                onChange={handleChange(setTitle)}
              />
              <textarea
                className="input"
                placeholder="내용을 입력하세요..."
                style={{ width: "30vw", height: "100px" }}
                value={content}
                onChange={handleChange(setContent)}
              />
              {links.map((link, index) => (
                <div key={index} className="link-input">
                  <input
                    type="text"
                    placeholder="링크를 입력하세요..."
                    value={link}
                    onChange={handleLinkChange(index)}
                  />
                  <button onClick={() => handleLinkField(index, "add")}>+</button>
                  <button onClick={() => handleLinkField(index, "remove")}>-</button>
                </div>
              ))}
            </div>
            <div className="row">
              <button className="submit" onClick={AiGenerate} disabled={title.trim() === "" || content.trim() === ""}>
                Generate
              </button>
              <button className="cancel" onClick={() => handleTextareaToggle(true)}>
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
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false, message: "", type: "" })} />
      )}
    </div>
  );
};

export default Stats;
