import React, { useState, useEffect } from "react";
import useWebStorage from "@hooks/useWebStorage";
import { convertHangule, debounce } from "@utils/index";
import { TextArea, HiraganaResult, TranslatedResult } from "@components/index";
import { MIN_TEXT, MAX_TEXT, CONVERT_DELAY } from "@constants/index";
import "./style.scss";

function Converter() {
  const [hangul, setHangul] = useState("");
  const [hiragana, setHiragana] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    debounce(() => handleConvert(), CONVERT_DELAY)();
  }, [hangul]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const newHangul = e.target.value;
    if (newHangul.length > MAX_TEXT) setError(true);
    else {
      setError(false);
      setHangul(newHangul);
    }
  }

  function handleConvert() {
    const hiragana = convertHangule(hangul);
    setHiragana(hiragana);
  }

  return (
    <section className="converter-container">
      <div className="process">
        <TextArea value={hangul} handleChange={handleChange} />
        <HiraganaResult hiragana={hiragana} />
      </div>
      <TranslatedResult text="희진언니 나랑 결혼해" />
    </section>
  );
}

export default Converter;
