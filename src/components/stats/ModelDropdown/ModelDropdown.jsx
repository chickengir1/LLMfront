import React from "react";
import "./ModelDropdown.css";

const ModelDropdown = ({ models, models1, selectedModel, setSelectedModel, selectedModel1, setSelectedModel1 }) => (
  <div className="section">
    <div className="Model-Section">
      <label>일반 설정</label>
      <select className="model-dropdown" value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
        {models.map((model, index) => (
          <option key={index} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
    <div className="Model-Section">
      <label>고급 설정</label>
      <select className="model-dropdown1" value={selectedModel1} onChange={(e) => setSelectedModel1(e.target.value)}>
        {models1.map((model1, index1) => (
          <option key={index1} value={model1}>
            {model1}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default ModelDropdown;
