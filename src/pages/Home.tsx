/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { CaretDoubleRight } from "phosphor-react";

import { Link } from "react-router-dom";

import { Note } from "../components/Note";

import { formatDate } from "../utils/formatDate";

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

export const Home = () => {
  const note = [
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
    {
      title: "tarefas",
      text: "sfydfcvhgjk uygftcgv fgh fdguyihkgv ftyghi",
      edited_at: "09 de aug",
    },
  ];

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
              {note.map((note) => {
                return (
                  <Note
                    title={note.title}
                    text={note.text}
                    edited_at={note.edited_at}
                  />
                );
              })}
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
