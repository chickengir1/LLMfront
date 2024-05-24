import React from "react";

const LinksInput = ({ links, setLinks }) => {
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

  return (
    <div className="section">
      <label>링크</label>
      <div className="inputs-container">
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
    </div>
  );
};

export default LinksInput;
