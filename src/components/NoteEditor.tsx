/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useState } from "react";

import { Notepad } from "phosphor-react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "../services/firebase";

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
  noteId?: string;
}

export const NoteEditor = ({ title, text, noteId }: NoteEditorProps) => {
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [isNoteSave, setIsNoteSave] = useState(false);
  const [docID, setDocID] = useState("");

  async function handleSaveNote() {
    if (docID !== "") {
      console.log(docID);
      try {
        const docRef = doc(firestore, `${auth.currentUser?.uid}`, docID);
        await updateDoc(docRef, {
          title: noteTitle,
          text: noteText,
          edited_at: serverTimestamp(),
        });

        setDocID(docRef.id);
        setIsNoteSave(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const docRef = doc(collection(firestore, `${auth.currentUser?.uid}`));
        await setDoc(docRef, {
          title: noteTitle,
          text: noteText,
          created_at: serverTimestamp(),
          user: auth.currentUser?.uid,
        });

        setDocID(docRef.id);
        setIsNoteSave(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (noteId) {
      setDocID(noteId);
    }
    setNoteText(text);
    setNoteTitle(title);
  }, [text, title]);

  return (
    <div css={NoteEditorStyle.self}>
      <header css={NoteEditorStyle.collection}>
        <input
          type='text'
          name='title'
          id='title'
          value={noteTitle}
          onChange={(e) => {
            setNoteTitle(e.target.value);
            setIsNoteSave(false);
          }}
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
          onChange={(e) => {
            setNoteText(e.target.value);
            setIsNoteSave(false);
          }}
        />
      </div>
      <footer css={NoteEditorStyle.footer}>
        {isNoteSave ? "Saved" : <button onClick={handleSaveNote}>Save</button>}
      </footer>
    </div>
  );
};
