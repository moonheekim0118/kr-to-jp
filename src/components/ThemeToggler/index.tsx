import React, { useState, useEffect } from "react";
import useWebStorage from "@hooks/useWebStorage";
import { ColorTheme, StorageKind, COLOR_THEME_KEY } from "@constants/index";
import "./style.scss";

function ThemeToggler() {
  const [getTheme, setTheme] = useWebStorage<ColorTheme>({
    key: COLOR_THEME_KEY,
    kind: StorageKind.LOCAL,
  });
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(
    getTheme() ?? ColorTheme.LIGHT
  );

  useEffect(() => {
    handleChangeTheme(currentTheme);
  }, []);

  function handleToggleTheme(): void {
    const theme =
      currentTheme === ColorTheme.LIGHT ? ColorTheme.DARK : ColorTheme.LIGHT;
    handleChangeTheme(theme);
  }

  function handleChangeTheme(theme: ColorTheme): void {
    setTheme(theme);
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={handleToggleTheme}
        checked={currentTheme === ColorTheme.DARK}
        name="theme-switch"
      />
      <div className="slider round" />
    </label>
  );
}

export default ThemeToggler;
