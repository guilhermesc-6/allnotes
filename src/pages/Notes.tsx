/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Note, NoteBlank } from "phosphor-react";

import { NoteEditor } from "../components/NoteEditor";

import { FormEvent, useEffect, useState } from "react";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { auth, firestore } from "../services/firebase";

import { dateFormatFirebase } from "../utils/formatDate";

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

type notesType = {
  data: DocumentData;
  id: string;
};

export const Notes = () => {
  const [selectedNote, setSelectedNote] = useState<notesType>({
    data: {},
    id: "",
  });
  const [notes, setNotes] = useState<notesType[]>([]);
  // const note = [
  //   {
  //     title: "tarefas",
  //     text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
  //     edited_at: "09 de aug",
  //   },
  //   {
  //     title: "tarefas",
  //     text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
  //     edited_at: "09 de aug",
  //   },
  //   {
  //     title: "tarefas",
  //     text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
  //     edited_at: "09 de aug",
  //   },
  //   {
  //     title: "tarefas",
  //     text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
  //     edited_at: "09 de aug",
  //   },
  //   {
  //     title: "tarefas",
  //     text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
  //     edited_at: "09 de aug",
  //   },
  //   {
  //     title: "tarefas",
  //     text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
  //     edited_at: "09 de aug",
  //   },
  //   {
  //     title: "tarefas",
  //     text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
  //     edited_at: "09 de aug",
  //   },
  // ];

  const selectNote = (event: FormEvent) => {
    const result: notesType[] = notes.filter(
      (note: notesType) => note.id === event.currentTarget.id
    );
    setSelectedNote(result[0]);
  };

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    const q = query(
      collection(firestore, `${userId}`),
      orderBy("edited_at", "desc")
    );
    const subscriber = onSnapshot(q, (docSnapshot) => {
      const data: notesType[] = [];
      docSnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setNotes(data);
    });
    return subscriber;
  }, []);

  useEffect(() => {
    if (selectedNote?.data?.text === "") {
      setSelectedNote(notes[0]);
    }
  }, []);

  return (
    <div css={NotesStyle.self}>
      <div css={NotesStyle.notesList}>
        <h1>
          <Note size={24} /> Notes
        </h1>
        <span>
          {notes.length > 1 ? `${notes.length} notes` : `${notes.length} note`}
        </span>
        <div css={NotesStyle.list}>
          {notes.length === 0 ? (
            <div
              style={{
                flex: "1",
                color: "var(--text)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <NoteBlank size={32} weight='bold' />{" "}
              <span>You dont have notes</span>{" "}
            </div>
          ) : (
            notes.map((note: notesType) => {
              return (
                <div id={note.id} key={note.id} onClick={selectNote}>
                  <h1>
                    {note.data.title.length ? note.data.title : "No Title"}
                  </h1>
                  <p>
                    {note.data.text.length ? note.data.text : "Empty note."}
                  </p>
                  <span>
                    {note.data.edited_at
                      ? dateFormatFirebase(note.data.edited_at)
                      : dateFormatFirebase(note.data.created_at)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div css={NotesStyle.editor}>
        <NoteEditor
          title={selectedNote?.data?.title}
          text={selectedNote?.data?.text}
          noteId={selectedNote.id}
        />
      </div>
    </div>
  );
};
