/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useState } from "react";

import { Notepad } from "phosphor-react";

const NoteEditorStyle = {
  self: css({
    width: "100%",
    height: "100vh",
    backgroundColor: "var(--editor-bg)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  }),
  collection: css({
    width: "100%",
    padding: ".5rem 1rem",
    color: "var(--text)",
    position: "sticky",
    top: "0",
    backgroundColor: "var(--editor-bg)",
    display: "flex",
    gap: "10px",
    h1: css({
      fontSize: "1.2rem",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    }),
    input: css({
      border: "none",
      background: "transparent",
      padding: ".2rem .5rem",
      fontSize: "1rem",
      fontWeight: "bold",
      color: "var(--text)",
      "&:focus": css({
        outline: "1px solid var(--text)",
      }),
    }),
  }),
  editor: css({
    width: "100%",
    height: "100%",
    textarea: css({
      width: "100%",
      height: "100%",
      padding: ".9rem 2rem",
      resize: "none",
      outline: "none",
      border: "none",
      borderTop: "1px solid var(--text)",
      borderBottom: "1px solid var(--text)",
      backgroundColor: "var(--editor-bg)",
      color: "var(--text)",
    }),
  }),
  footer: css({
    width: "100%",
    padding: ".5rem 1rem",
    color: "var(--text)",
  }),
};

interface NoteEditorProps {
  title: string;
  text: string;
}

export const NoteEditor = ({ title, text }: NoteEditorProps) => {
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  useEffect(() => {
    console.log(title);
  }, [text, title]);

  return (
    <div css={NoteEditorStyle.self}>
      <header css={NoteEditorStyle.collection}>
        <input
          type='text'
          name='title'
          id='title'
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder='Title'
        />
        <h1>
          <Notepad size={24} /> Notebook
        </h1>
      </header>
      <div css={NoteEditorStyle.editor}>
        <textarea
          name='editor'
          id='editor'
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
      </div>
      <footer css={NoteEditorStyle.footer}>Saved</footer>
    </div>
  );
};
