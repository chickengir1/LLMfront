import React from "react";

const TitleInput = ({ title, setTitle }) => {
  return (
    <div className="section">
      <label>이름 입력</label>
      <input
        className="inputtitle"
        placeholder="제목을 입력하세요..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={14}
      />
    </div>
  );
};

export default TitleInput;
