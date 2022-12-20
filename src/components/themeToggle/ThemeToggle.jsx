import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { theme, themeToggle } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <FiSun className={`theme-icon ${theme === "light" ? "active" : ""}`} />
      <span className="toggle" onClick={themeToggle}>
        <div className={`switch ${theme === "dark" ? "dark" : ""}`}></div>
      </span>
      <FiMoon className={`theme-icon ${theme === "dark" ? "active" : ""}`} />
    </div>
  );
};

export default ThemeToggle;
