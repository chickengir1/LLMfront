import React from "react";

const models = [
  "모델을 선택해주세요",
  "meta-llama-3-70b-instruct",
  "mistral-7b-instruct-v0-2",
  "mixtral-8x7b-instruct-v0-1",
  "gemma-7b-it",
];

const ModelDropdown = ({ selectedModel, setSelectedModel }) => {
  return (
    <div className="section">
      <label>모델 설정</label>
      <select
        className="model-dropdown"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        {models.map((model, index) => (
          <option key={index} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelDropdown;
