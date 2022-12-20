import { useContext } from "react";
import MarkdownContext from "../../context/MarkdownContext";
import ThemeContext from "../../context/ThemeContext";
import { FiX } from "react-icons/fi";
import "./Modal.css";

const Modal = ({ setIsOpen }) => {
  const { activeDoc, docs, setDocs, setMarkdown, setDocName } =
    useContext(MarkdownContext);
  const { theme } = useContext(ThemeContext);

  const deleteDoc = () => {
    setDocs(docs.filter((doc) => doc.id !== activeDoc));
    localStorage.setItem(
      "documents",
      JSON.stringify(docs.filter((doc) => doc.id !== activeDoc))
    );
    setIsOpen(false);

    if (docs[0].id === activeDoc) {
      setMarkdown(docs[1].content);
      setDocName(docs[1].name);
      console.log(docs[1].name);
    } else {
      setMarkdown(docs[0].content);
      setDocName(docs[0].name);
    }
  };

  return (
    <div className="overlay">
      <div className={`modal-content ${theme === "dark" ? "dark" : ""}`}>
        <div className="heading">
          <h2>Delete this document?</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <FiX style={{ fontSize: "1.5rem", color: "var(--clr-500)" }} />
          </button>
        </div>
        <p>
          Are you sure you want to delete this document and its content? This
          action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="delete-btn" onClick={deleteDoc}>
            Delete
          </button>
          <button className="cancel-btn" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
