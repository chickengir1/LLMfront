import React from "react";
import "./LinkInput.css";

const LinkInput = ({ links, handleLinkChange, handleLinkField }) => (
  <div className="link-input-container">
    {links.map((link, index) => (
      <div key={index} className="link-input">
        <input
          type="text"
          placeholder="링크를 입력하세요..."
          value={link}
          onChange={handleLinkChange(index)}
        />
        <button onClick={() => handleLinkField(index, "add")}>+</button>
        {links.length > 1 && (
          <button onClick={() => handleLinkField(index, "remove")}>-</button>
        )}
      </div>
    ))}
  </div>
);

export default LinkInput;
