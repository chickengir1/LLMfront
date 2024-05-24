import React from "react";
import "./TextareaInput.css";

const TextareaInput = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="prompt">{label}</label>
      <div className="textarea">
    <textarea
      className="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
  </div>

);

export default TextareaInput;
