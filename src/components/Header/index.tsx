import React from "react";
import ThemeToggler from "@components/ThemeToggler";
import "./style.scss";

function Header() {
  return (
    <header>
      <ThemeToggler />
      <h1 className="title">한본어 번역기</h1>
      <p className="description">한본어➔히라가나➔번역</p>
      <p className="detail">개떡같이 말해도 찰떡같이 聞き分けろ</p>
    </header>
  );
}

export default Header;
