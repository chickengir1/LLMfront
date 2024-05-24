import React, { useState } from "react";
import Toast from "../toast/Toast";
import ModelDropdown from "./ModelDropdown/ModelDropdown";
import TextInput from "./TextInput/TextInput";
import TextareaInput from "./TextareaInput/TextareaInput";
import LinkInput from "./LinkInput/LinkInput";
import NumberInput from "./NumberInput/NumberInput";
import "./stats.css";

const models = [
  "모델을 선택해주세요",
  "meta-llama-3-70b-instruct",
  "mistral-7b-instruct-v0-2",
  "mixtral-8x7b-instruct-v0-1",
  "gemma-7b-it",
];

const Stats = () => {
  const [textarea, setTextarea] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [links, setLinks] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [temperature, setTemperature] = useState(0.7);
  const [responseMaxTokens, setResponseMaxTokens] = useState(200);
  const [persona, setPersona] = useState("");

  const handleTextareaToggle = (reset = false) => {
    setTextarea(!textarea);
    if (reset) {
      setTitle("");
      setContent("");
      setLinks([""]);
      setTemperature(0.7);
      setResponseMaxTokens(200);
      setPersona("");
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
        temperature,
        response_max_tokens: responseMaxTokens,
        persona,
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
              <ModelDropdown
                models={models}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />
              <TextInput
                label="이름 입력"
                value={title}
                onChange={handleChange(setTitle)}
                placeholder="제목을 입력하세요..."
              />
              <TextareaInput
                label="프롬프트"
                value={content}
                onChange={handleChange(setContent)}
                placeholder="내용을 입력하세요..."
              />
              <LinkInput
                links={links}
                handleLinkChange={handleLinkChange}
                handleLinkField={handleLinkField}
              />
              <div className="Num-CON">
              <NumberInput
                label="온도(Temperature)"
                value={temperature}
                min={0}
                max={3}
                step={0.1}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
              />
              <NumberInput
                label="최대 응답 토큰 수(Max Response Tokens)"
                value={responseMaxTokens}
                min={0}
                max={4000}
                onChange={(e) => setResponseMaxTokens(parseInt(e.target.value, 10))}
              />
              </div>
              <TextInput
                label="페르소나(System Prompt)"
                value={persona}
                placeholder="당신은 유용한 AI 어시스턴트입니다. 사용자의 질의에 대해 친절하고 정확하게 답변해야 합니다."
                onChange={handleChange(setPersona)}
              />
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
