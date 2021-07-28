import React from "react";
import "./style.scss";

interface Props {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({ value, handleChange }: Props) {
  return (
    <textarea
      name="korean-textarea"
      className="korean-textarea"
      placeholder="예시) 아리가또고자이마스"
      value={value}
      onChange={handleChange}
    />
  );
}

export default TextArea;
