/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Note } from "phosphor-react";

import { NoteEditor } from "../components/NoteEditor";

import { FormEvent, useEffect } from "react";

const NotesStyle = {
  self: css({
    width: "100%",
    height: "100vh",
    display: "flex",
    gap: "5px",
    backgroundColor: "var(--editor-bg)",
    color: "var(--text)",
    overflowY: "hidden",
  }),
  notesList: css({
    width: "350px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderRight: "1px solid var(--text)",
    overflowY: "auto",
    h1: css({
      display: "flex",
      alignItems: "center",
      gap: "5px",
      padding: "0.8rem .5rem",
      fontSize: "1.2rem",
    }),
    ">span": css({
      paddingLeft: ".6rem",
    }),
  }),
  list: css({
    ">div": css({
      width: "100%",
      height: "120px",
      padding: ".1rem .9rem",
      borderBottom: "1px solid var(--text)",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
      "&:first-of-type": css({
        borderTop: "1px solid var(--text)",
      }),
      h1: css({
        fontSize: "1.2rem",
        fontWeight: "bolder",
      }),
      p: css({
        height: "35%",
        width: "100%",
        textOverflow: "ellipsis",
        overflow: "hidden",
        wordBreak: "break-word",
        whiteSpace: "nowrap",
      }),
      span: css({
        fontSize: ".9rem",
        padding: ".2rem 0 0 .4rem",
      }),
      "&:hover": css({
        backgroundColor: "var(--bg-primary)",
      }),
    }),
  }),
  editor: css({
    flex: "1",
  }),
};

type NoteType = {
  title: string;
  text: string;
  edited_at: string;
};

export const Notes = () => {
  const note = [
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
  ];

  let selectedNote: NoteType = { title: "", text: "", edited_at: "" };

  const selectNote = (event: FormEvent) => {
    selectedNote = note[eval(event.currentTarget.id)];
    console.log(selectedNote);
  };

  useEffect(() => {
    if (selectedNote.text === "") {
      selectedNote = note[0];
    }
  }, []);

  return (
    <div css={NotesStyle.self}>
      <div css={NotesStyle.notesList}>
        <h1>
          <Note size={24} /> Notes
        </h1>
        <span>
          {note.length > 1 ? `${note.length} notes` : `${note.length} note`}
        </span>
        <div css={NotesStyle.list}>
          {note.map((note, id) => {
            return (
              <div id={id.toString()} key={id} onClick={selectNote}>
                <h1>{note.title}</h1>
                <p>{note.text}</p>
                <span>{note.edited_at}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div css={NotesStyle.editor}>
        <NoteEditor title={selectedNote.title} text={selectedNote.text} />
      </div>
    </div>
  );
};
