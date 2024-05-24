import React from "react";
import "./ModelDropdown.css";

const ModelDropdown = ({ models, selectedModel, setSelectedModel }) => (
  <div className="section">
    <label>모델 설정</label>
    <select className="model-dropdown" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
      {models.map((model, index) => (
        <option key={index} value={model}>
          {model}
        </option>
      ))}
    </select>
  </div>
);

export default ModelDropdown;
