import React, { useState, useEffect } from "react";
import useWebStorage from "@hooks/useWebStorage";
import { convertHangule, debounce } from "@utils/index";
import { TextArea, HiraganaResult, TranslatedResult } from "@components/index";
import { MAX_TEXT, CONVERT_DELAY } from "@constants/index";
import request from "../../api";
import "./style.scss";

function Converter() {
  const [hangul, setHangul] = useState("");
  const [hiragana, setHiragana] = useState("");
  const [translatedResult, setTranslatedResult] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (hangul.length === 0) return;
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
    request(hiragana)
      .then((result) => {
        setHiragana(hiragana);
        setTranslatedResult(result);
      })
      .catch((error) => {
        setTranslatedResult(error.message);
      });
  }

  return (
    <section className="converter-container">
      <div className="process">
        <TextArea value={hangul} error={error} handleChange={handleChange} />
        <HiraganaResult hiragana={hiragana} />
      </div>
      <TranslatedResult text={translatedResult} />
    </section>
  );
}

export default Converter;
