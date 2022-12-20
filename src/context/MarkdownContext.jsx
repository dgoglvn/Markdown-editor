import { createContext, useState, useEffect } from "react";
import data from "../data.json";

const MarkdownContext = createContext();

export const MarkdownProvider = ({ children }) => {
  const [markdown, setMarkdown] = useState("");
  const [docs, setDocs] = useState([]);
  const [activeDoc, setActiveDoc] = useState(false);
  const [docName, setDocName] = useState("");

  useEffect(() => {
    // if localStorage does not have documents saved
    if (!localStorage.getItem("documents")) {
      localStorage.setItem("documents", JSON.stringify(data));
      setDocs(data);
      setMarkdown(data[0].content);
    } else {
      // if localStorage has documents saved
      setDocs(JSON.parse(localStorage.getItem("documents")));
      setMarkdown(JSON.parse(localStorage.getItem("documents"))[0].content);
      setDocName(JSON.parse(localStorage.getItem("documents"))[0].name);
      // algorithm for sorting localStorage documents by most recently modified
      const sortDocs = JSON.parse(localStorage.getItem("documents")).sort(
        (a, b) => (a.lastModified > b.lastModified ? -1 : 1)
      );
      // Setting most recently modified doc to activeDoc so user comes back to it
      // if they closed or refreshed the page
      setActiveDoc(sortDocs[0].id);
      setMarkdown(sortDocs[0].content);
      setDocName(sortDocs[0].name);
    }
  }, []);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
    docs.map((doc) => {
      if (doc.id === activeDoc) {
        doc.lastModified = new Date().toLocaleString();
      }
    });
  };

  return (
    <MarkdownContext.Provider
      value={{
        markdown,
        setMarkdown,
        docs,
        setDocs,
        activeDoc,
        setActiveDoc,
        docName,
        setDocName,
        handleChange,
      }}
    >
      {children}
    </MarkdownContext.Provider>
  );
};

export default MarkdownContext;
