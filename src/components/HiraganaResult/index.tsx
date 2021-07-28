import React from "react";
import "./style.scss";

interface Props {
  hiragana: string;
}

function HiraganaResult({ hiragana }: Props) {
  return (
    <div className="hiragana-container">
      <h3 className="title">히라가나 변환 결과</h3>
      <p className="result">{hiragana}</p>
    </div>
  );
}

export default HiraganaResult;
