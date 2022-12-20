import { useState, useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import { MarkdownProvider } from "./context/MarkdownContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import DocEditor from "./components/docEditor/DocEditor";
import Modal from "./components/modal/Modal";

function App() {
  const { theme } = useContext(ThemeContext);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app">
      <ToastContainer
        autoClose={1000}
        hideProgressBar="true"
        theme={`${theme === "dark" ? "dark" : ""}`}
      />
      <MarkdownProvider>
        <Sidebar toggleMenu={toggleMenu} />
        <div className={`main ${toggleMenu ? "open-menu" : ""}`}>
          <Header
            toggleMenu={toggleMenu}
            setToggleMenu={setToggleMenu}
            setIsOpen={setIsOpen}
          />
          <DocEditor />
        </div>
        {isOpen && <Modal setIsOpen={setIsOpen} />}
      </MarkdownProvider>
    </div>
  );
}

export default App;
