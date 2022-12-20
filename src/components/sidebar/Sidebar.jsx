import { useEffect, useContext } from "react";
import MarkdownContext from "../../context/MarkdownContext";
import ThemeToggle from "../themeToggle/ThemeToggle";
import Document from "../document/Document";
import "./Sidebar.css";

const Sidebar = ({ toggleMenu }) => {
  const { docs, setDocs } = useContext(MarkdownContext);

  const createDoc = () => {
    setDocs([
      ...docs,
      {
        name: "untitled",
        content: "",
        lastModified: new Date().toLocaleString(),
        id: Math.floor(Math.random() * 1000000),
      },
    ]);
  };

  // algorithm for sorting documents by most recently modified
  const sortDocs = [...docs].sort((a, b) =>
    a.lastModified > b.lastModified ? -1 : 1
  );

  return (
    <div className={`sidebar ${toggleMenu ? "open" : ""}`}>
      <h2>My Documents</h2>
      <button onClick={createDoc}>New Document</button>
      <ul className="doc-list">
        {sortDocs.map((doc) => {
          return <Document doc={doc} key={doc.id} />;
        })}
      </ul>
      <ThemeToggle />
    </div>
  );
};

export default Sidebar;
