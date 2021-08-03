import React, { useRef, useState } from "react";
import { convertHangul } from "@utils/index";
import { TextArea, HiraganaResult, TranslatedResult } from "@components/index";
import { APIStatus } from "@constants/index";
import request from "../../api";
import "./style.scss";

function Converter() {
  const input = useRef<string>("");
  const [hiragana, setHiragana] = useState("");
  const [translatedResult, setTranslatedResult] = useState("");
  const [status, setStatus] = useState<APIStatus | "">("");

  async function handleConvert(hangul: string = ""): Promise<void> {
    try {
      if (hangul.trim().length === 0) return;
      const hiragana = convertHangul(hangul);
      if (hiragana.length === 0) return;

      setStatus(APIStatus.LOADING);
      setHiragana(hiragana);
      const result = await request(hiragana);
      setTranslatedResult(result);
      setStatus(APIStatus.DONE);
      return;
    } catch (error) {
      setStatus(APIStatus.FAIL);
      setTranslatedResult(error.message);
    }
  }

  return (
    <section className="converter-container">
      <div className="prev-container">
        <TextArea handleConvert={handleConvert} ref={input} />
        <HiraganaResult hiragana={hiragana} />
      </div>
      <TranslatedResult text={translatedResult} status={status} />
    </section>
  );
}

export default Converter;
