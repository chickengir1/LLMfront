import React, { useState } from "react";
import Toast from "../toast/Toast";
import ModelDropdown from "./ModelDropdown";
import TitleInput from "./TitleInput";
import PromptTextarea from "./PromptTextarea";
import LinksInput from "./Linkinput";
import "./stats.css";

const Stats = () => {
  const [textarea, setTextarea] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [links, setLinks] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedModel, setSelectedModel] = useState("모델을 선택해주세요");

  const handleTextareaToggle = (reset = false) => {
    setTextarea(!textarea);
    if (reset) {
      setTitle("");
      setContent("");
      setLinks([""]);
    }
  };

  const AiGenerate = async () => {
    setLoading(true);
    handleTextareaToggle(true);

    try {
      const response = await fetch('/LLMfront/db.json');
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();

      const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      const newBoxId = data.reduce((maxId, model) => 
        model.data.reduce((maxDataId, box) => Math.max(maxDataId, box.id), maxId), 0) + 1;

      const newBox = {
        id: newBoxId,
        title,
        content,
        links
      };

      if (selectedModel === "모델을 선택해주세요") {
        throw new Error('모델을 선택해주세요');
      }

      const newModel = {
        id: newId,
        model: selectedModel,
        bot_name: "Friendli",
        data: [newBox]
      };

      const saveResponse = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newModel),
      });

      if (!saveResponse.ok) throw new Error('Failed to save data');

      setToast({ show: true, message: "생성이 완료되었습니다.", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: error.message || "생성 중 오류가 발생했습니다.", type: "error" });
    } finally {
      setLoading(false);
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
          {!textarea && (
            <button className="started" onClick={() => handleTextareaToggle()} disabled={loading}>
              GET STARTED
            </button>
          )}
        </div>
        {textarea && (
          <div className="textarea">
            <div className="area">
              <ModelDropdown selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
              <TitleInput title={title} setTitle={setTitle} />
              <PromptTextarea content={content} setContent={setContent} />
              <LinksInput links={links} setLinks={setLinks} />
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
