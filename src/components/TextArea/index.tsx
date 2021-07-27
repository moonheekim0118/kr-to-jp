import React, { useState } from "react";
import useWebStorage from "@hooks/useWebStorage";
import "./style.scss";

function TextArea() {
  const [text, setText] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setText(e.target.value);
  }

  return (
    <textarea
      name="korean-textarea"
      className="korean-textarea"
      placeholder="예시) 아리가또고자이마스"
      value={text}
      onChange={handleChange}
    />
  );
}

export default TextArea;
