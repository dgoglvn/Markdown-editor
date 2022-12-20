import { useContext, useEffect, useState } from "react";
import MarkdownContext from "../../context/MarkdownContext";
import { FiFile, FiTrash2, FiSave } from "react-icons/fi";
import { toast } from "react-toastify";
import "./Header.css";

const Header = ({ toggleMenu, setToggleMenu, setIsOpen }) => {
  const { docs, setDocs, activeDoc, docName, setDocName, markdown } =
    useContext(MarkdownContext);

  const handleToggle = () => {
    if (toggleMenu) {
      setToggleMenu(false);
    } else {
      setToggleMenu(true);
    }
  };

  const saveDoc = () => {
    setDocs(
      docs.map((doc) =>
        doc.id === activeDoc
          ? { ...doc, name: docName, content: markdown }
          : doc
      )
    );
    localStorage.setItem(
      "documents",
      JSON.stringify(
        docs.map((doc) =>
          doc.id === activeDoc
            ? { ...doc, name: docName, content: markdown }
            : doc
        )
      )
    );

    toast.success("Changes saved!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="header">
      <div className="menu-toggle-wrapper" onClick={handleToggle}>
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
      </div>
      <h1 className="logo">Markdown</h1>
      <div className="doc-infos">
        <FiFile className="doc-infos-icon" />
        <div className="doc-infos-name">
          <label htmlFor="docName">Document Name</label>
          <input
            type="text"
            name="docName"
            className="docName-inp"
            onChange={(e) => setDocName(e.target.value)}
            value={docName}
          />
        </div>
      </div>
      <div
        className="btn-group"
        style={{ display: "flex", alignItems: "center" }}
      >
        <button className="modal-toggle" onClick={() => setIsOpen(true)}>
          <FiTrash2 className="icon" />
        </button>
        <button className="save-doc" onClick={saveDoc}>
          <FiSave className="icon" />
          Save changes
        </button>
      </div>
    </div>
  );
};

export default Header;
