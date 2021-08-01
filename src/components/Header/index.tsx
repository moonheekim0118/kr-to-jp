import React from "react";
import ThemeToggler from "@components/ThemeToggler";
import "./style.scss";

function Header() {
  return (
    <header>
      <ThemeToggler />
      <h1 className="title">한본어 번역기</h1>
      <p className="description">한본어➔히라가나➔번역</p>
      <p className="detail">
        최대 1000자까지 가능합니다. 가타카나는 인식하지 못합니다.
      </p>
    </header>
  );
}

export default Header;
