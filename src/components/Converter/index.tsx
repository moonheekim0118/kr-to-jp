import React, { useState, useEffect } from "react";
import { convertHangul, debounce } from "@utils/index";
import { TextArea, HiraganaResult, TranslatedResult } from "@components/index";
import { MAX_TEXT, CONVERT_DELAY, APIStatus } from "@constants/index";
import request from "../../api";
import "./style.scss";

function Converter() {
  const [hangul, setHangul] = useState("");
  const [hiragana, setHiragana] = useState("");
  const [translatedResult, setTranslatedResult] = useState("");
  const [status, setStatus] = useState<APIStatus | "">("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (hangul.length === 0) return;
    debounce(() => handleConvert(), CONVERT_DELAY)();
  }, [hangul]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    const newHangul = e.target.value.trim();
    if (newHangul.length > MAX_TEXT) {
      setError(true);
      return;
    } else {
      setError(false);
      setHangul(newHangul);
    }
  }

  function handleConvert(): void {
    const hiragana = convertHangul(hangul);
    if (hiragana.length === 0) return;
    setStatus(APIStatus.LOADING);
    request(hiragana)
      .then((result) => {
        setHiragana(hiragana);
        setTranslatedResult(result);
        setStatus(APIStatus.DONE);
        return;
      })
      .catch((error) => {
        setStatus(APIStatus.FAIL);
        setTranslatedResult(error.message);
      });
  }

  return (
    <section className="converter-container">
      <div className="prev-container">
        <TextArea value={hangul} error={error} handleChange={handleChange} />
        <HiraganaResult hiragana={hiragana} />
      </div>
      <TranslatedResult text={translatedResult} status={status} />
    </section>
  );
}

export default Converter;
