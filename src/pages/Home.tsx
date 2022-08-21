/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import {
  collection,
  onSnapshot,
  query,
  DocumentData,
  orderBy,
  limit,
} from "firebase/firestore";

import { CaretDoubleRight, NoteBlank } from "phosphor-react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Note } from "../components/Note";
import { auth, firestore } from "../services/firebase";

import { dateFormatFirebase, formatDate } from "../utils/formatDate";

const HomeStyle = {
  self: css({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    backgroundColor: "var(--bg-primary)",
    "&::before": css({
      content: "''",
      width: "100%",
      height: "60%",
      backgroundColor: "#fefefe",
      backgroundImage: "var(--background-image)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      position: "absolute",
    }),
    ">div": css({
      zIndex: "10",
      backgroundColor: "rgba(234, 234, 235,.2)",
      height: "100%",
    }),
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between",
    padding: ".2rem 1rem",
    fontSize: "1.3rem",
    color: "var(--text)",
    "span:last-child": css({
      fontSize: "1rem",
      marginRight: "2.5rem",
    }),
  }),
  widgets: css({
    marginTop: "15rem",
    display: "flex",
    gap: "10px",
    padding: "0 2rem",
  }),
  notes: css({
    width: "800px",
    border: "1px solid var(--bg-primary)",
    borderRadius: "10px",
    background: "var(--note-bg)",
    padding: ".5rem",
    a: css({
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "1.5rem",
      textDecoration: "none",
      color: "var(--text)",
    }),
  }),
  notesSlider: css({
    display: "flex",
    gap: "10px",
    padding: "1rem .5rem",
    overflowX: "auto",
    width: "100%",
    "a:last-child": css({
      fontSize: "1rem",
      textAlign: "center",
      background: "var(--brand-color)",
      padding: ".3rem",
      borderRadius: "10px",
      color: "#fff",
      "&:hover": css({
        background: "var(--brand-color-dark)",
      }),
    }),
  }),
  scratch: css({
    width: "394px",
    height: "340px",
    borderRadius: "10px",
    backgroundColor: "var(--scratch-bg)",
    border: "1px solid #23232F",
    h1: css({
      padding: ".4rem",
      fontSize: "1.3rem",
      color: "var(--text)",
    }),
    textarea: css({
      resize: "none",
      width: "100%",
      height: "290px",
      border: "none",
      backgroundColor: "var(--scratch-bg)",
      padding: "0 .4rem",
      color: "var(--text)",
      "&:focus": css({
        outline: "none",
      }),
      "&::placeholder": css({
        color: "var(--text)",
      }),
    }),
  }),
};

type notesType = {
  data: DocumentData;
  id: string;
};

export const Home = () => {
  const [notes, setNotes] = useState<notesType[]>([]);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    const q = query(
      collection(firestore, `${userId}`),
      orderBy("edited_at", "desc"),
      limit(15)
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

  return (
    <div
      css={HomeStyle.self}
      // style={{
      //   ["--background-image" as any]:
      //     "url(https://images.pexels.com/photos/292475/pexels-photo-292475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
      // }}
    >
      <div>
        <header css={HomeStyle.header}>
          <span>
            {new Date().getHours() < 12
              ? "Good Morning"
              : new Date().getHours() > 18
              ? "Good Night"
              : "Good Afternoon"}
            , Guilherme
          </span>
          <span>{formatDate(new Date().toString())}</span>
        </header>
        <div css={HomeStyle.widgets}>
          <div css={HomeStyle.notes}>
            <Link to='/notes'>
              Notes <CaretDoubleRight size={24} color='#E0E0E2' />
            </Link>
            <div css={HomeStyle.notesSlider}>
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
                    <>
                      <Note
                        key={note.id}
                        title={note.data.title}
                        text={note.data.text}
                        edited_at={dateFormatFirebase(note.data.edited_at)}
                        created_at={dateFormatFirebase(note.data.created_at)}
                      />
                      <Link to='/notes'>See all notes</Link>
                    </>
                  );
                })
              )}
            </div>
          </div>
          <div css={HomeStyle.scratch}>
            <h1>Scratchpad</h1>
            <textarea
              name='scratchpad'
              id='scratchpad'
              placeholder='Start typing...'
              translate='no'
              spellCheck='false'
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
