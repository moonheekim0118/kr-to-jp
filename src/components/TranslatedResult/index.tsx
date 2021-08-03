import React from "react";
import { Loading } from "@components/index";
import { APIStatus } from "@constants/index";
import "./style.scss";

interface Props {
  text: string;
  status: APIStatus | "";
}

function TranslatedResult({ text, status }: Props) {
  const renderByStatus = {
    [APIStatus.LOADING]: (
      <div className="loader-container">
        <Loading />
      </div>
    ),
    [APIStatus.DONE]: <p className="result">{text}</p>,
    [APIStatus.FAIL]: <p className="error">{text}</p>,
  };

  return (
    <section className="result-container">
      <h3 className="title">번역 결과</h3>
      <div className="result-card">
        {status !== "" && renderByStatus[status]}
      </div>
    </section>
  );
}

export default TranslatedResult;
