/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const NoteEditorStyle = {
  self: css({
    width: "100%",
    height: "100vh",
    backgroundColor: "var(--bg-primary)",
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
    backgroundColor: "var(--bg-primary)",
  }),
  editor: css({
    width: "100%",
    height: "100%",
    textarea: css({
      width: "100%",
      height: "100%",
      padding: ".2rem 2rem",
      resize: "none",
      outline: "none",
      border: "none",
      borderTop: "1px solid var(--text)",
      borderBottom: "1px solid var(--text)",
      backgroundColor: "var(--bg-primary)",
      color: "var(--text)",
    }),
  }),
  footer: css({
    width: "100%",
    padding: ".5rem 1rem",
    color: "var(--text)",
  }),
};

export const NoteEditor = () => {
  return (
    <div css={NoteEditorStyle.self}>
      <header css={NoteEditorStyle.collection}>Notebook</header>
      <div css={NoteEditorStyle.editor}>
        <textarea name='editor' id='editor' />
      </div>
      <footer css={NoteEditorStyle.footer}>Saved</footer>
    </div>
  );
};
