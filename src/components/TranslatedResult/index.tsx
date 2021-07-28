import React from "react";
import "./style.scss";

interface Props {
  text: string;
}

function TranslatedResult({ text }: Props) {
  return (
    <section className="result-container">
      <h3 className="title">번역 결과</h3>
      <div className="result-card">{text}</div>
    </section>
  );
}

export default TranslatedResult;
