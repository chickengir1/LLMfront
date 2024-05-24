import React from "react";
import "./TextInput.css";

const TextInput = ({ label, value, onChange, placeholder }) => (
  <div className="section">
    <label>{label}</label>
    <input
      className="inputtitle"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default TextInput;
