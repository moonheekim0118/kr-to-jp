import React from "react";

interface Props {
  hiragana: string;
}

function HiraganaResult({ hiragana }: Props) {
  return <div className="hiragana-result">{hiragana}</div>;
}

export default HiraganaResult;
