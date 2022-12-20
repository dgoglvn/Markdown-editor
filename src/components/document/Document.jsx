import { useContext } from "react";
import MarkdownContext from "../../context/MarkdownContext";
import moment from "moment";
import "./Document.css";

const Document = ({ doc }) => {
  const { setMarkdown, setActiveDoc, setDocName } = useContext(MarkdownContext);

  const handleClick = () => {
    setActiveDoc(doc.id);
    setMarkdown(doc.content);
    setDocName(doc.name);
  };

  return (
    <li className="doc-item" onClick={handleClick}>
      <p className="doc-item-name">{doc.name}</p>
      <p className="doc-item-date">{doc.lastModified}</p>
    </li>
  );
};

export default Document;
