import React from "react";
import "./NumberInput.css";

const NumberInput = ({ label, value, min, max, step, onChange }) => (
  <div className="section">
    <div className="Num-sec">
      <div className="Num-CN">
        <label>{label}</label>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
        />
      </div>
    </div>
  </div>
);

export default NumberInput;
