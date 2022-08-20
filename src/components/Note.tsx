/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const NoteStyle = {
  self: css({
    display: "flex",
    flexDirection: "column",
    width: "200px",
    gap: "10px",
    backgroundColor: "var(--note-card)",
    borderRadius: "10px",
    height: "250px",
    flexShrink: "0",
    position: "relative",
  }),
  title: css({
    color: "var(--text)",
    marginLeft: ".7rem",
    fontSize: "1.2rem",
  }),
  text: css({
    padding: "0 .9rem",
    textAlign: "center",
    color: "var(--text)",
    opacity: "0.7",
    wordBreak: "break-word",
  }),
  footer: css({
    fontSize: ".9rem",
    textAlign: "center",
    color: "var(--text)",
    position: "absolute",
    bottom: "0",
    width: "100%",
    marginBottom: ".5rem",
    backgroundColor: "var(--note-card)",
  }),
};

type NotesProps = {
  title: string;
  text: string;
  edited_at: string | undefined;
  created_at: string | undefined;
};

export const Note = (props: NotesProps) => {
  return (
    <div css={NoteStyle.self}>
      <h1 css={NoteStyle.title}>{props.title}</h1>
      <p css={NoteStyle.text}>{props.text}</p>
      <span css={NoteStyle.footer}>
        {props.edited_at ? props.edited_at : props.created_at}
      </span>
    </div>
  );
};
