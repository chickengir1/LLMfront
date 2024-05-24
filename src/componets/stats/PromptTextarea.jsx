import React from "react";

const PromptTextarea = ({ content, setContent }) => {
  return (
    <div className="section">
      <label>프롬프트</label>
      <textarea
        className="input"
        placeholder="내용을 입력하세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default PromptTextarea;
