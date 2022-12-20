import { useState, useEffect, useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import MarkdownContext from "../../context/MarkdownContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./DocEditor.css";

const DocEditor = () => {
  const { theme } = useContext(ThemeContext);
  const { markdown, handleChange, doc, setDoc } = useContext(MarkdownContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showMarkdown, setShowMarkdown] = useState(true);

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleClick = () => {
    if (showMarkdown) {
      setShowMarkdown(false);
    } else {
      setShowMarkdown(true);
    }
  };

  return (
    <div className="doc-editor">
      {isMobile ? (
        <div
          className={`${showMarkdown ? "markdown" : "preview"} ${
            theme === "dark" ? "dark" : ""
          }`}
        >
          <div className={`${showMarkdown ? "markdown" : "preview"}-header`}>
            <p>{showMarkdown ? "Markdown" : "Preview"}</p>
            {showMarkdown ? (
              <FiEye className="preview-icon" onClick={handleClick} />
            ) : (
              <FiEyeOff className="preview-icon" onClick={handleClick} />
            )}
          </div>
          {showMarkdown ? (
            <textarea
              className="md-editor"
              spellCheck="false"
              onChange={handleChange}
              value={markdown}
            ></textarea>
          ) : (
            <div className="preview-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ) : (
        <div className="wrapper" style={{ display: "flex" }}>
          <>
            {showMarkdown ? (
              <div className={`markdown ${theme === "dark" ? "dark" : ""}`}>
                <div className="markdown-header">
                  <p>Markdown</p>
                  {isMobile && (
                    <>
                      {showMarkdown ? (
                        <FiEye className="preview-icon" onClick={handleClick} />
                      ) : (
                        <FiEyeOff
                          className="preview-icon"
                          onClick={handleClick}
                        />
                      )}
                    </>
                  )}
                </div>
                <textarea
                  className="md-editor"
                  spellCheck="false"
                  onChange={handleChange}
                  value={markdown}
                ></textarea>
              </div>
            ) : (
              ""
            )}
          </>
          <hr
            className={`divider ${!showMarkdown ? "hidden" : ""} ${
              theme === "dark" ? "dark" : ""
            }`}
          />
          <div
            className={`preview ${!showMarkdown ? "read" : ""} ${
              theme === "dark" ? "dark" : ""
            }`}
          >
            <div className="preview-header">
              <p>Preview</p>
              {!isMobile && (
                <>
                  {showMarkdown ? (
                    <FiEye className="preview-icon" onClick={handleClick} />
                  ) : (
                    <FiEyeOff className="preview-icon" onClick={handleClick} />
                  )}
                </>
              )}
            </div>
            <div className="preview-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocEditor;
